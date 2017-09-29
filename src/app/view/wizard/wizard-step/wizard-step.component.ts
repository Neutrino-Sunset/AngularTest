import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-wizard-step',
   templateUrl: './wizard-step.component.html',
   styleUrls: ['./wizard-step.component.css']
})
export class WizardStepComponent implements OnInit {

   public active: boolean;

   constructor() { }

   ngOnInit() {
   }
}
