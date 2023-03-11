import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent {
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() colorConfig: string;

  getAvatar(): string {
    return `${Array.from(this.firstName)[0].toUpperCase()}${Array.from(
      this.lastName
    )[0].toUpperCase()}`;
  }
}
