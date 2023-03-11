import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mode-selection',
  templateUrl: './mode-selection.component.html',
  styleUrls: ['../user-pages/common/shared.css'],
})
export class ModeSelectionComponent {
  constructor(private router: Router) {}

  onClick(selection: string) {
    switch (selection) {
      case 'creation':
        this.router.navigate(['/ride-creation']);
        break;
      case 'search':
        this.router.navigate(['/user-rides']);
        break;
    }
  }
}
