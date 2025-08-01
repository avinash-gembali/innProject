import { Component, viewChild } from '@angular/core';
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
  ],
  templateUrl: './add-helper.component.html',
  styleUrl: './add-helper.component.scss',
})
export class AddHelperComponent {
  constructor(
    private dialog: MatDialog,
    private helperService: HelperService,
    private router: Router
  ) {}

  @ViewChild('helperDetails') helperDetailsComponent!: HelperDetailsComponent;
  @ViewChild('documentDetails') documentDetailsComponent!: DocumentsComponent;
  helperFormData: any = null;
  documentFormData: any = null;

  steps = [
    { title: 'HelperDetails', description: 'Add Helper Details' },
    { title: 'Documents', description: 'Upload Related Documents' },
    { title: 'Review', description: 'Check the information and confirm' },
  ];

  currentStep = 0;

  nextStep() {
    if (this.currentStep === 0) {
      // Validate helper details step
      if (!this.helperDetailsComponent?.isFormValid()) {
        console.warn('Form is invalid');
        return;
      }

      this.helperFormData = this.helperDetailsComponent.getFormData();
      console.log('Helper Form Data:', this.helperFormData);
    }

    if (this.currentStep == 1) {
      if (!this.documentDetailsComponent?.isFormValid()) {
        console.warn('Form is invalid at step2');
        return;
      }
      this.documentFormData = this.documentDetailsComponent.getFormData();
      console.log('Document Form Data :', this.documentFormData);
    }

    if (this.currentStep === 2) {
      const form = this.helperFormData;
      const newHelper: Helper = {
        id: Date.now(), // or use UUID, etc.
        name: form.fullName || '-',
        role: form.service || '-',
        imageUrl: form.photoPreview || '', // base64 if uploaded
        employeeCode: '-', // TODO: generate dynamically or assign manually
        gender: form.gender || '-',
        languages: form.languages || [],
        mobileNo: form.phone || '-',
        emailId: form.email || '-',
        type: form.service || '-',
        organization: form.organization || '-',
        joinedOn: new Date().toISOString().split('T')[0], // 'YYYY-MM-DD'
      };
      this.helperService.addHelper(newHelper);
      console.log('Helper temporarily added:', newHelper);

      const dialogRef = this.dialog.open(AddedDialogComponent, {
        height : '300px',
        width: '500px',
        data: { name: newHelper.name },
      });

      dialogRef.afterClosed().subscribe(() => {
        this.dialog.open(HelperQrComponent, {
          height : '500px',
          width : '500px',
          data: newHelper,
        });
      });

      // Optionally navigate back or reset the form
      this.router.navigate(['/helpers', 1]);
      return;
    }

    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }
}
