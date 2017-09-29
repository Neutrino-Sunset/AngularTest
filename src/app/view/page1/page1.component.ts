import { forwardRef, Component, OnInit } from '@angular/core';
import { WizardStepComponent } from 'app/view/wizard/wizard-step/wizard-step.component';


@Component({
   selector: 'app-page1',
   templateUrl: './page1.component.html',
   styleUrls: ['./page1.component.css'],
   providers: [{ provide: WizardStepComponent, useExisting: forwardRef(() => Page1Component) }]
})
export class Page1Component extends WizardStepComponent {

}
