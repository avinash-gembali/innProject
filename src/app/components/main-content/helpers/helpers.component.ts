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
    // Get ID from route param and load the correct helper
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.selectedHelper = this.helpers[0];
  }

  loadHelpers() {
    this.helpers = this.helperService.getHelpers();
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
