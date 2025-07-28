import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentsComponent } from './sections/documents/documents.component';
import { HelperDetailsComponent } from './sections/helper-details/helper-details.component';
import { ReviewComponent } from './sections/review/review.component';
import { NgIf , NgFor } from '@angular/common';

@Component({
  selector: 'app-add-helper',
  standalone: true,
  imports: [RouterModule, DocumentsComponent, HelperDetailsComponent, ReviewComponent, NgIf, NgFor],
  templateUrl: './add-helper.component.html',
  styleUrl: './add-helper.component.scss',
})
export class AddHelperComponent {
  steps = [
    { title: 'HelperDetails', description: 'Add Helper Details' },
    { title: 'Documents', description: 'Upload Related Documents' },
    { title: 'Review', description: 'Check the information and confirm' },
  ];

  currentStep = 0;

  nextStep() {
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
