import { Component, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';


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

   private _isValidChanged: Subject<WizardPageComponent> = new Subject<WizardPageComponent>();
   public isValidChanged$: Observable<WizardPageComponent> = this._isValidChanged.asObservable();

   private _isValid: boolean = true;
   public get isValid(): boolean { return this._isValid; }
   public set isValid(valid: boolean) {
      this._isValid = valid;
      this._isValidChanged.next(this);
   }
}
