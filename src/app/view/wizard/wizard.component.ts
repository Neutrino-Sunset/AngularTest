import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output,
   QueryList } from '@angular/core';
import { MenuItem, StepsModule } from 'primeng/primeng';
import { Subscription } from 'rxjs';

import { WizardPageComponent } from 'app/view/wizard/wizard-page/wizard-page.component';


// -- Overview --
// Reusable component to support the creation of a wizard style UI that presents a task as a sequence of steps.
//
// -- Usage --
// Implement each page in your wizard as a new component that subclasses WizardPageComponent. See 'app/view/page1' for
// an example.
//
// Create a WizardComponent that contains your WizardPages. See 'app/app.component.html' for an example.
//
// WizardPages can control whether the Next/Finish is enabled by setting their isValid state. See
// 'app/page3/page3.component.ts' for an example.
@Component({
   selector: 'app-wizard',
   templateUrl: './wizard.component.html'
})
export class WizardComponent implements AfterContentInit {

   // Public interface.

   @Input() wizardTitle: string;

   @Output() pageChanged: EventEmitter<{ pageIndex: number, pageTitle: string }>
      = new EventEmitter<{ pageIndex: number, pageTitle: string }>();

   @Output() finished: EventEmitter<void> = new EventEmitter<void>();

   // Cancel button implementation left as an exercise for the reader.
   //@Output() cancelled: EventEmitter<void> = new EventEmitter<void>();

   // Implementation.

   @ContentChildren(WizardPageComponent) steps: QueryList<WizardPageComponent>;

   public items: MenuItem[] = [];

   public activePageIndex: number = 0;

   public activePageTitle: string = "";

   public previousButtonDisabled: boolean = true;

   public nextButtonDisabled: boolean = false;

   public nextButtonText: string = "Next";


   public ngAfterContentInit(): void {
      this.steps.forEach((step: WizardPageComponent) => {
         this.items.push({ label: step.pageTitle });
         // I'm not sure it's necessary to unsubscribe from either of these events because the lifetime of the pages is
         // the same as the lifetime of the wizard.
         step.isValidChanged$.subscribe((page: WizardPageComponent) => {
            this.nextButtonDisabled = !page.isValid;
         });
         step.pageChangeRequest$.subscribe((index: number) => {
            this.activePageIndex = index;
            this.update();
         })
      });

      this.update();
   }

   public onPrevious(): void {
      --this.activePageIndex;
      this.update();
   }

   public onNext(): void {
      if (this.activePageIndex == this.steps.length - 1) {
         this.finished.emit();
      } else {
         ++this.activePageIndex;
         this.update();
      }
   }

   public onChanged(): void {
      this.update();
   }

   private update(): void {
      this.steps.forEach((step: WizardPageComponent, index: number) => {
         if (index == this.activePageIndex) {
            step.isActive = true;
            this.activePageTitle = step.pageTitle;
            this.nextButtonDisabled = !step.isValid;
         } else {
            step.isActive = false;
         }
      })
      this.previousButtonDisabled = this.activePageIndex == 0;
      this.nextButtonText = this.activePageIndex == this.steps.length - 1 ? "Finish" : "Next";
      this.pageChanged.emit({ pageIndex: this.activePageIndex, pageTitle: this.activePageTitle });
   }
}
