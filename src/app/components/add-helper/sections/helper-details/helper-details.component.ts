import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
  ],
  templateUrl: './helper-details.component.html',
  styleUrl: './helper-details.component.scss',
})
export class HelperDetailsComponent {
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
    const selected = this.languageControl.value || [];

    if (this.isAllSelected()) {
      // Deselect all
      this.languageControl.setValue([]);
    } else {
      // Select all languages
      this.languageControl.setValue(['selectall', ...this.languages]);
    }
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
}
