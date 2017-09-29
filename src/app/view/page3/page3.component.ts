import { forwardRef, Component, OnInit } from '@angular/core';
import { WizardStepComponent } from 'app/view/wizard/wizard-step/wizard-step.component';


@Component({
   selector: 'app-page3',
   templateUrl: './page3.component.html',
   styleUrls: ['./page3.component.css'],
   providers: [{ provide: WizardStepComponent, useExisting: forwardRef(() => Page3Component) }]
})
export class Page3Component extends WizardStepComponent implements OnInit {

   public data: number = 0;

   public ngOnInit(): void {
      this.isValid = false;
   }

   public onDataChanged(): void {
      console.log('onDataChanged - data: ' + this.data);
      this.isValid = this.data > 0;
      this.fireIsValidChanged();
   }
}
