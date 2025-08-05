import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HelpersComponent } from './helpers/helpers.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Helper } from '../../shared/helper';
import { HelperService } from '../../shared/helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    MatIconModule,
    HelpersComponent,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent implements OnInit {
  helpers: Helper[] = [];
  selectedHelper?: Helper;
  selectedSort: string = 'id';

  constructor(
    private helperService: HelperService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.helperService.getHelpers().subscribe({
      next: (data) => {
        this.helpers = data;
        // Route-based auto-selection logic
        const idFromRoute = Number(this.route.snapshot.paramMap.get('id'));
        if (idFromRoute) {
          const match = this.helpers.find((h) => h.id === idFromRoute);
          if (match) {
            this.selectedHelper = match;
          }
        } else if (this.helpers.length > 0) {
          this.selectedHelper = this.helpers[0];
          this.router.navigate(['/helpers', this.selectedHelper.id]); // optional
        }
      },
      error: (err) => {
        console.error('Error Fetching Helpers', err);
      },
    });
  }

  sortByName() {
    this.selectedSort = 'name';
    this.helpers.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByID(){
    this.selectedSort = 'id';
    this.helpers.sort((a,b) => a.id - b.id);
  }
}
