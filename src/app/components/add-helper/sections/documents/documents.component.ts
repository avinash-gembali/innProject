import { Component } from '@angular/core';
import { AdditionalDialogComponent } from '../additional-dialog/additional-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent {
  constructor(public dialog: MatDialog) {}
  form = new FormGroup({
    additionalDocument: new FormControl<File | null>(null),
  });
  openUploadDialog(): void {
    const dialogRef = this.dialog.open(AdditionalDialogComponent, {
      width: '500px', // Adjust width as needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.form.patchValue({ additionalDocument: result });
        console.log('Dialog result:', result);
        // Handle the selected category and file here (e.g., upload the file)
      }
    });
  }

  getFormData(): any {
    return this.form.value;
  }

  isFormValid(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }
}
