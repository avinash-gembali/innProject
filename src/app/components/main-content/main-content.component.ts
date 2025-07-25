import { Component } from '@angular/core';
import { UserSearchComponent } from './user-search/user-search.component';
import { MatIconModule } from '@angular/material/icon';
import { HelpersComponent } from './helpers/helpers.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [UserSearchComponent,MatIconModule,HelpersComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
