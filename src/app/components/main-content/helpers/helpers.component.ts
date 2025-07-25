import { Component, OnInit } from '@angular/core';
import { Helper } from '../../../shared/helper';
import { HELPERS } from '../../../shared/helperData';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-helpers',
  standalone: true,
  imports: [MatIconModule , CommonModule, NgFor, NgIf],
  templateUrl: './helpers.component.html',
  styleUrl: './helpers.component.scss',
})
export class HelpersComponent implements OnInit {
  helpers = HELPERS;
  selectedHelper?: Helper;

  ngOnInit(): void {
    this.selectedHelper = this.helpers[0]; // Select first helper by default
  }

  selectUser(helper: Helper) {
    this.selectedHelper = helper;
  }
}
