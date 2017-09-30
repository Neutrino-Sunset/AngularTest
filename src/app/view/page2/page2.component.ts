import { forwardRef, Component, OnInit } from '@angular/core';
import { WizardPageComponent } from 'app/view/wizard/wizard-step/wizard-step.component';


@Component({
   selector: 'app-page2',
   templateUrl: './page2.component.html',
   providers: [{ provide: WizardPageComponent, useExisting: forwardRef(() => Page2Component) }]
})
export class Page2Component extends WizardPageComponent {
}
