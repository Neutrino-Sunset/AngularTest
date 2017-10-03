import { forwardRef, Component, OnInit } from '@angular/core';

import { WizardPageComponent } from 'app/view/wizard/wizard-page/wizard-page.component';


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

   public onGoToPage2(): void {
      this.goToPage(1); // Zero based index of page 2.
   }

   public onDataChanged(): void {
      this.isValid = this.data > 0;
   }
}
