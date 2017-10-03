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

   private _pageChangeRequest: Subject<number> = new Subject<number>();
   public pageChangeRequest$: Observable<number> = this._pageChangeRequest.asObservable();

   private _isValid: boolean = true;
   public get isValid(): boolean { return this._isValid; }

   // The WizardPage should set this property to notify the WizardComponent whether the page is valid or not. The
   // WizardComponent will update the button states accordingly.
   public set isValid(valid: boolean) {
      this._isValid = valid;
      this._isValidChanged.next(this);
   }

   // The WizardPage should call this method to tell the WizardComponent to navigate to a different page of the wizard.
   // For this demonstration the page index is used, but the page header or the page's type signature could be used
   // instead.
   public goToPage(index: number) {
      this._pageChangeRequest.next(index);
   }
}
