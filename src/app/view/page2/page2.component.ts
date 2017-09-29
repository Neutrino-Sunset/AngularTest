import { forwardRef, Component, OnInit } from '@angular/core';
import { WizardStepComponent } from 'app/view/wizard/wizard-step/wizard-step.component';


@Component({
   selector: 'app-page2',
   templateUrl: './page2.component.html',
   styleUrls: ['./page2.component.css'],
   providers: [{ provide: WizardStepComponent, useExisting: forwardRef(() => Page2Component) }]
})
export class Page2Component extends WizardStepComponent {
}
