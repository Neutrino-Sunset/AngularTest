import { Component, Input } from '@angular/core';

@Component({
   selector: 'app-wizard-step',
   templateUrl: './wizard-step.component.html',
   styleUrls: ['./wizard-step.component.css']
})
export class WizardStepComponent {

   @Input() title: string;

   public active: boolean;
}
