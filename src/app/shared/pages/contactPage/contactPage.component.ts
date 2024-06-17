import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-contact-page',
  templateUrl: './contactPage.component.html',
  styleUrl: './contactPage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent { }
