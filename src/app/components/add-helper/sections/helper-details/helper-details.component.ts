import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-helper-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  templateUrl: './helper-details.component.html',
  styleUrl: './helper-details.component.scss',
})
export class HelperDetailsComponent {

  constructor(public dialog: MatDialog) {}

  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('File stored:', this.selectedFile.name);
      // You can now upload this.selectedFile to a server or preview it
    }
  }
  serviceControl = new FormControl();
  services = [
    { name: 'Maid', icon: 'cleaning_services' },
    { name: 'Cook', icon: 'restaurant' },
    { name: 'Driver', icon: 'drive_eta' },
    { name: 'Nurse', icon: 'medical_services' },
  ];

  organizationControl = new FormControl();
  organizations = ['ASBL', 'Spring Helpers'];

  languageControl = new FormControl<string[]>([]);
  languages: string[] = ['Hindi', 'English', 'Telugu'];

  toggleSelectAll() {
    if (this.isAllSelected()) {
      // Deselect all
      this.languageControl.setValue([]);
    } else {
      // Select all languages
      this.languageControl.setValue([...this.languages]);
    }
  }

  getSelectedLanguagesDisplay(): string {
    const selected = this.languageControl.value || [];

    if (selected.length === 0) return 'Select languages';
    if (selected.length === 1) return selected[0];

    return `${selected[0]} +${selected.length - 1} more`;
  }

  isAllSelected(): boolean {
    const selected = this.languageControl.value || [];
    return (
      this.languages.length > 0 &&
      this.languages.every((lang) => selected.includes(lang))
    );
  }
  vehicleControl = new FormControl();
  vehicles = ['none', 'Bike', 'Car', 'Auto'];
  get showPhoneField(): boolean {
    return this.vehicleControl.value && this.vehicleControl.value !== 'none';
  }

  openUploadDialog(): void {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '500px', // Adjust width as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
        // Handle the selected category and file here (e.g., upload the file)
      }
    });
  }

}
