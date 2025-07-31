import { Component, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentsComponent } from './sections/documents/documents.component';
import { HelperDetailsComponent } from './sections/helper-details/helper-details.component';
import { ReviewComponent } from './sections/review/review.component';
import { NgIf, NgFor } from '@angular/common';
import { ViewChild } from '@angular/core';

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
