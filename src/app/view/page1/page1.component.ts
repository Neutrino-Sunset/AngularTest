import { forwardRef, Component, OnInit } from '@angular/core';
import { WizardPageComponent } from 'app/view/wizard/wizard-step/wizard-step.component';


@Component({
   selector: 'app-page1',
   templateUrl: './page1.component.html',
   providers: [{ provide: WizardPageComponent, useExisting: forwardRef(() => Page1Component) }]
})
export class Page1Component extends WizardPageComponent {

}
