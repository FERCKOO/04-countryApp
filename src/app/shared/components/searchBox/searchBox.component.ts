import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './searchBox.component.html',
  styleUrl: './searchBox.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent {
  @Input()
  public placeHolder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  emitValue(value: string): void{

    this.onValue.emit(value);

  }

}
