import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { MenuItem, StepsModule } from 'primeng/primeng';
import { Subscription } from 'rxjs';

import { WizardStepComponent } from './wizard-step/wizard-step.component';


@Component({
   selector: 'app-wizard',
   templateUrl: './wizard.component.html'
})
export class WizardComponent implements AfterContentInit, OnDestroy {

   // Public interface.

   @Input() wizardTitle: string;

   @Output() pageChanged: EventEmitter<{ pageIndex: number, pageTitle: string }>
      = new EventEmitter<{ pageIndex: number, pageTitle: string }>();

   @Output() finished: EventEmitter<void> = new EventEmitter<void>();

   // Cancel button implementation left as an exercise for the reader.
   //@Output() cancelled: EventEmitter<void> = new EventEmitter<void>();

   // Implementation.

   @ContentChildren(WizardStepComponent) steps: QueryList<WizardStepComponent>;

   public items: MenuItem[] = [];

   public activeIndex: number = 0;

   public activeTitle: string = "";

   public previousButtonDisabled: boolean = true;

   public nextButtonDisabled: boolean = false;

   public nextButtonText: string = "Next";

   private _validChangedUnsub: Subscription;

   public ngAfterContentInit(): void {
      this.steps.forEach((step: WizardStepComponent) => {
         this.items.push({ label: step.title });
         this._validChangedUnsub = step.isValidChanged$.subscribe((page: WizardStepComponent) => {
            this.nextButtonDisabled = !page.isValid;
         });
      });

      this.update();
   }

   public ngOnDestroy(): void {
      this._validChangedUnsub.unsubscribe();
   }

   public onPrevious(): void {
      --this.activeIndex;
      this.update();
   }

   public onNext(): void {
      if (this.activeIndex == this.steps.length - 1) {
         this.finished.emit();
      } else {
         ++this.activeIndex;
         this.update();
      }
   }

   public onChanged(): void {
      this.update();
   }

   private update(): void {
      this.steps.forEach((step: WizardStepComponent, index: number) => {
         if (index == this.activeIndex) {
            step.isActive = true;
            this.activeTitle = step.title;
            this.nextButtonDisabled = !step.isValid;
         } else {
            step.isActive = false;
         }
      })
      this.previousButtonDisabled = this.activeIndex == 0;
      this.nextButtonText = this.activeIndex == this.steps.length - 1 ? "Finish" : "Next";
      this.pageChanged.emit({ pageIndex: this.activeIndex, pageTitle: this.activeTitle });
   }
}
