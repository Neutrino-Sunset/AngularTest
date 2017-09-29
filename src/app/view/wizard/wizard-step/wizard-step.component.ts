import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';


@Component({
   selector: 'app-wizard-step',
   template: `
      <div *ngIf='isActive'>
         <!-- Copy this to your Page subclass and put your content here. -->
      </div>
   `
})
export class WizardStepComponent {

   @Input() title: string;

   public isActive: boolean = false;

   public isValid: boolean = true;

   private _isValidChanged: Subject<WizardStepComponent> = new Subject<WizardStepComponent>();
   public isValidChanged$ = this._isValidChanged.asObservable();

   public fireIsValidChanged(): void {
      this._isValidChanged.next(this);
   }
}
