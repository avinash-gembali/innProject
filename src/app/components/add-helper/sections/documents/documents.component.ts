import { Component } from '@angular/core';
import { AdditionalDialogComponent } from '../additional-dialog/additional-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {
  constructor(public dialog: MatDialog) {}
  openUploadDialog(): void {
      const dialogRef = this.dialog.open(AdditionalDialogComponent, {
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
