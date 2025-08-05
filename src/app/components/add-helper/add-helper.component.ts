import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentsComponent } from './sections/documents/documents.component';
import { HelperDetailsComponent } from './sections/helper-details/helper-details.component';
import { ReviewComponent } from './sections/review/review.component';
import { NgIf, NgFor } from '@angular/common';
import { ViewChild } from '@angular/core';
import { HelperService } from '../../shared/helper.service';
import { Router } from '@angular/router';
import { Helper } from '../../shared/helper';
import { AddedDialogComponent } from './added-dialog/added-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HelperQrComponent } from './helper-qr/helper-qr.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from '../../shared/loading.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-helper',
  standalone: true,
  imports: [
    RouterModule,
    DocumentsComponent,
    HelperDetailsComponent,
    ReviewComponent,
    NgIf,
    NgFor,
    MatProgressBarModule,
  ],
  templateUrl: './add-helper.component.html',
  styleUrl: './add-helper.component.scss',
})
export class AddHelperComponent {
  isEditMode = false;
  editingHelperId!: number;
  additionalDocumentFileName?: string;
  additionalDocumentCategory?: string;
  @ViewChild('helperDetails') helperDetailsComponent!: HelperDetailsComponent;

  @ViewChild('documentDetails') documentDetailsComponent!: DocumentsComponent;

  constructor(
    private dialog: MatDialog,
    private helperService: HelperService,
    private router: Router,
    private loadingService: LoadingService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.editingHelperId = +id;
        this.setSteps();
        this.loadHelperData(this.editingHelperId);
      } else {
        this.setSteps();
      }
    });
  }
  employeeCode = '';

  loadHelperData(id: number) {
    this.helperService.getHelperById(id).subscribe((helper) => {
      // Step 1: Patch Helper Details
      this.employeeCode = helper.employeeCode;
      this.helperDetailsComponent?.form.patchValue({
        service: helper.role,
        organization: helper.organization,
        fullName: helper.name,
        languages: helper.languages,
        gender: helper.gender,
        phone: helper.mobileNo,
        email: helper.emailId,
        vehicle: helper.vehicle || 'none',
        vehicleNumber: helper.vehicleNumber || '',
        photoPreview: helper.imageUrl || null,
        kycDocument: helper.kycDocument
          ? {
              category: helper.kycDocument.category,
              fileName: helper.kycDocument.fileName,
            }
          : null,
      });

      this.helperDetailsComponent.selectedImageUrl = helper.imageUrl;

      // Step 2: Patch Additional Document
      this.documentDetailsComponent?.form.patchValue({
        additionalDocument: helper.additionalDocument
          ? {
              category: helper.additionalDocument.category,
              fileName: helper.additionalDocument.fileName,
            }
          : null,
      });
      this.additionalDocumentFileName = helper.additionalDocument?.fileName;
      this.additionalDocumentCategory = helper.additionalDocument?.category;
    });
  }

  helperFormData: any = null;
  documentFormData: any = null;

  steps: { title: string; description: string }[] = [];

  private setSteps() {
    this.steps = this.isEditMode
      ? [
          { title: 'HelperDetails', description: 'Edit Helper Details' },
          { title: 'Documents', description: 'Edit Documents' },
        ]
      : [
          { title: 'HelperDetails', description: 'Add Helper Details' },
          { title: 'Documents', description: 'Upload Related Documents' },
          { title: 'Review', description: 'Check the information and confirm' },
        ];
  }

  currentStep = 0;

  nextStep() {
    if (this.currentStep === 0) {
      // Validate helper details step
      if (!this.helperDetailsComponent?.isFormValid()) {
        console.warn('Form is invalid');
        return;
      }

      this.helperFormData = this.helperDetailsComponent.getFormData();
      console.log('Helper Form Data', this.helperFormData);
    }

    if (this.currentStep == 1) {
      if (!this.documentDetailsComponent?.isFormValid()) {
        console.warn('Form is invalid at step2');
        return;
      }
      this.documentFormData = this.documentDetailsComponent.getFormData();
      console.log('Document Form Data', this.documentFormData);
    }

    if (this.currentStep === 2) {
      const form = this.helperFormData;
      const doc = this.documentFormData;

      const imageFile = form.photo;
      this.loadingService.show();

      const createAndSaveHelper = (imageUrl: string) => {
        this.helperService.getHelpers().subscribe((helpers) => {
          const newId = helpers.length
            ? Math.max(...helpers.map((h) => h.id)) + 1
            : 1;

          const newHelper: Helper = {
            id: newId,
            name: form.fullName || '-',
            role: form.service || '-',
            imageUrl: imageUrl || '',
            employeeCode: 'EMP' + newId.toString().padStart(4, '0'),
            gender: form.gender || '-',
            languages: form.languages || [],
            mobileNo: form.phone || '-',
            emailId: form.email || '',
            vehicle: form.vehicle || 'none',
            vehicleNumber: form.vehicleNumber || '',
            organization: form.organization || '-',
            joinedOn: new Date().toISOString().split('T')[0],
            additionalDocument: doc?.additionalDocument
              ? {
                  category: doc.additionalDocument.category,
                  fileName: doc.additionalDocument.fileName,
                }
              : undefined,
            kycDocument: form?.kycDocument
              ? {
                  category: form.kycDocument.category,
                  fileName: form.kycDocument.fileName,
                }
              : undefined,
          };

          this.helperService.addHelper(newHelper).subscribe({
            next: (savedHelper) => {
              this.loadingService.hide();
              const dialogRef = this.dialog.open(AddedDialogComponent, {
                height: '300px',
                width: '500px',
                data: { name: savedHelper.name },
              });

              dialogRef.afterClosed().subscribe(() => {
                this.dialog.open(HelperQrComponent, {
                  height: '500px',
                  width: '500px',
                  data: savedHelper,
                });
              });

              this.router.navigate(['/helpers', savedHelper.id]);
            },
            error: (err) => {
              this.loadingService.hide();
              console.error('Error saving helper:', err);
            },
          });
        });
      };

      if (imageFile && imageFile instanceof File) {
        // ✅ Only upload if file exists
        this.helperService.uploadImage(imageFile).subscribe({
          next: (response) => {
            createAndSaveHelper(response.url);
          },
          error: (uploadErr) => {
            this.loadingService.hide();
            console.error('Image upload failed:', uploadErr);
          },
        });
      } else {
        createAndSaveHelper('');
      }
    }
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
    this.loadHelperData(this.editingHelperId);
  }

  submit() {
    console.log(this.helperDetailsComponent);

    if (!this.documentDetailsComponent?.isFormValid()) {
      console.warn('Document form is invalid');
      return;
    }

    console.log(this.helperFormData);
    const documentData = this.documentDetailsComponent.getFormData();
    console.log(documentData);

    const updatedHelper = {
      id: this.editingHelperId,
      employeeCode: this.employeeCode,
      ...this.helperFormData,
      ...documentData,
    };

    const photo = updatedHelper.photo;

    if (photo) {
      console.log('Uploading photo...');

      this.helperService.uploadImage(photo).subscribe({
        next: (response) => {
          updatedHelper.photoPreview = response.url;
          this.sendUpdate(updatedHelper);
        },
        error: (uploadErr) => {
          this.loadingService.hide();
          console.error('Image upload failed:', uploadErr);
        },
      });
    } else {
      this.sendUpdate(updatedHelper);
    }
  }
  private sendUpdate(updatedHelper: any) {
    this.helperService
      .updateHelper(this.editingHelperId, updatedHelper)
      .subscribe({
        next: () => {
          this.loadingService.hide();
          this.router.navigate(['/helpers', this.editingHelperId]);
        },
        error: (err) => {
          this.loadingService.hide();
          console.error('Update failed:', err);
        },
      });
  }
}
