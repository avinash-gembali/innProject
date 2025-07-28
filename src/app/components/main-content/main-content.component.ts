import { Component } from '@angular/core';
import { UserSearchComponent } from './user-search/user-search.component';
import { MatIconModule } from '@angular/material/icon';
import { HelpersComponent } from './helpers/helpers.component';
import { AddHelperComponent } from '../add-helper/add-helper.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [MatIconModule, HelpersComponent, RouterModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
