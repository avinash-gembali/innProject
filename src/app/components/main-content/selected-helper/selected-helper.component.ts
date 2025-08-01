import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Helper } from '../../../shared/helper';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selected-helper',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './selected-helper.component.html',
  styleUrl: './selected-helper.component.scss',
})
export class SelectedHelperComponent {
  @Input({ required: true }) selectedHelper!: Helper;

  getInitials(name?: string): string {
    if (!name) return '';
    return name.replace(/\s+/g, '').substring(0, 2).toUpperCase();
  }
}
