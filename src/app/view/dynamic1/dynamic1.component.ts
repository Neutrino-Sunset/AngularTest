import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
   selector: 'app-dynamic1',
   templateUrl: './dynamic1.component.html',
   styleUrls: ['./dynamic1.component.css']
})
export class Dynamic1Component {

   @Input() input: string;

   @Output() onOk: EventEmitter<string> = new EventEmitter<string>();

   public result: string = '';

   constructor() { }

   public onOkClick(): void {
      this.onOk.emit(this.result);
   }
}
