import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-about-page',
  templateUrl: './aboutPage.component.html',
  styleUrl: './aboutPage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent { }
