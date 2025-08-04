import { Component, OnInit } from '@angular/core';
import { Helper } from '../../../shared/helper';
import { HelperService } from '../../../shared/helper.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { SelectedHelperComponent } from '../selected-helper/selected-helper.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-helpers',
  standalone: true,
  imports: [MatIconModule, CommonModule, NgFor, NgIf, SelectedHelperComponent],
  templateUrl: './helpers.component.html',
  styleUrl: './helpers.component.scss',
})
export class HelpersComponent implements OnInit {
  helpers: Helper[] = [];
  selectedHelper?: Helper;

  constructor(
    private helperService: HelperService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHelpers();
  }

  onHelperDeleted() {
    this.helperService.getHelpers().subscribe((data) => {
      this.helpers = data;

      if (this.helpers.length > 0) {
        // Auto-select the first available helper
        this.selectedHelper = this.helpers[0];
        this.router.navigate(['/helpers', this.selectedHelper.id]);
      } else {
        // No helpers left
        this.selectedHelper = undefined;
        this.router.navigate(['/helpers']);
      }
    });
  }

  loadHelpers() {
    this.helperService.getHelpers().subscribe((data) => {
      this.helpers = data;

      // Optional: auto-select first helper if route ID is missing
      const idFromRoute = Number(this.route.snapshot.paramMap.get('id'));
      if (idFromRoute) {
        const match = this.helpers.find((h) => h.id === idFromRoute);
        if (match) {
          this.selectedHelper = match;
        }
      } else {
        this.selectedHelper = this.helpers[0];
      }
    });
  }

  selectHelper(helper: Helper) {
    this.selectedHelper = helper;
    this.router.navigate(['/helpers', helper.id]); // Update URL
  }

  getInitials(name?: string): string {
    if (!name) return '';
    return name.replace(/\s+/g, '').substring(0, 2).toUpperCase();
  }
}
