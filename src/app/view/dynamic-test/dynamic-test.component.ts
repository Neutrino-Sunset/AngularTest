import { Component, OnInit } from '@angular/core';
import { Dynamic1Component } from '../dynamic1/dynamic1.component';

@Component({
   selector: 'app-dynamic-test',
   templateUrl: './dynamic-test.component.html',
   styleUrls: ['./dynamic-test.component.css']
})
export class DynamicTestComponent {

   public dynamic1 = Dynamic1Component;
   public showDynamic1: boolean = true;

   public dynamic1Inputs = {
      input: 'Input string'
   }

   public dynamic1Outputs = {
      onOk: (result) => this.onDynamic1Ok(result)
   }

   constructor() { }

   public toggleDynamic1(): void {
      this.dynamic1 = this.dynamic1 == null ? Dynamic1Component : null;
   }

   public onDynamic1Ok(result: string): void {
      console.log(result);
   }
}
