import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { MenuItem, StepsModule } from 'primeng/primeng';

import { WizardStepComponent } from './wizard-step/wizard-step.component';


@Component({
   selector: 'app-wizard',
   templateUrl: './wizard.component.html',
   styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements AfterContentInit {

   // Public interface.

   @Input() wizardTitle: string;

   @Output() pageChanged: EventEmitter<{ pageIndex: number, pageTitle: string }>
      = new EventEmitter<{ pageIndex: number, pageTitle: string }>();

   @Output() finished: EventEmitter<void> = new EventEmitter<void>();

   // Left unimplemented as an exercise for the reader.
   //@Output() cancelled: EventEmitter<void> = new EventEmitter<void>();

   // Implementation.

   @ContentChildren(WizardStepComponent) steps: QueryList<WizardStepComponent>;

   public items: MenuItem[] = [];

   public activeIndex: number = 0;

   public activeTitle: string = "";

   public previousButtonDisabled: boolean = true;

   public nextButtonText: string = "Next";

   public ngAfterContentInit(): void {
      this.items = this.steps.map((step: WizardStepComponent) =>
         ({ label: step.title })
      );

      this.update();
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
            step.active = true;
            this.activeTitle = step.title
         } else {
            step.active = false;
         }
      })
      this.previousButtonDisabled = this.activeIndex == 0;
      this.nextButtonText = this.activeIndex == this.steps.length - 1 ? "Finish" : "Next";
      this.pageChanged.emit({ pageIndex: this.activeIndex, pageTitle: this.activeTitle });
   }
}
