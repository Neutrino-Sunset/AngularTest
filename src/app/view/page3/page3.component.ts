import { forwardRef, Component, OnInit } from '@angular/core';
import { WizardPageComponent } from 'app/view/wizard/wizard-step/wizard-step.component';


@Component({
   selector: 'app-page3',
   templateUrl: './page3.component.html',
   providers: [{ provide: WizardPageComponent, useExisting: forwardRef(() => Page3Component) }]
})
export class Page3Component extends WizardPageComponent implements OnInit {

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
