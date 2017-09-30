import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';


@Component({
   selector: 'app-wizard-page',
   template: `
      <div *ngIf='isActive'>
         <!-- Copy this entire template to your Page subclass .html file and put your content here. -->
      </div>
   `
})
export class WizardPageComponent {

   @Input() pageTitle: string;

   public isActive: boolean = false;

   public isValid: boolean = true;

   private _isValidChanged: Subject<WizardPageComponent> = new Subject<WizardPageComponent>();
   public isValidChanged$ = this._isValidChanged.asObservable();

   public fireIsValidChanged(): void {
      this._isValidChanged.next(this);
   }
}
