import { AfterContentInit, Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { MenuItem, StepsModule } from 'primeng/primeng';

import { WizardStepComponent } from './wizard-step/wizard-step.component';


@Component({
   selector: 'app-wizard',
   templateUrl: './wizard.component.html',
   styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements AfterContentInit, OnInit {

   @ContentChildren(WizardStepComponent) steps: QueryList<WizardStepComponent>;

   public items: MenuItem[] = [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' }
   ];

   public activeIndex: number = 0;

   private _activeStep: number = 0;

   public constructor() { }

   public ngOnInit(): void { }

   public ngAfterContentInit(): void {
      this.steps.forEach((step: WizardStepComponent, index: number) => {
         console.log('step ' + index);

         step.active = index === this._activeStep;
      })
   }

   public onNext(): void {
      ++this.activeIndex;
   }

   public onChanged(): void {
      console.log('onChanged');
   }
}
