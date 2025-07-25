import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent} from './components/sidebar/sidebar.component'; 
import { MainContentComponent } from './components/main-content/main-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    SidebarComponent , 
    MainContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Helpers';
}
