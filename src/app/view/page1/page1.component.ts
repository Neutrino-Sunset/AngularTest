import { forwardRef, Component, OnInit } from '@angular/core';

import { WizardPageComponent } from 'app/view/wizard/wizard-page/wizard-page.component';


// Implement each wizard page by subclassing WizardPageComponent.

// Subclassing an Angular component consists of the following steps.
// 1. Import the base class. e.g. import { WizardPageComponent } from '.../wizard-page.component';
// 2. Extend the subclass. e.g. 'export class Page1Component extends WizardPageComponent'
// 3. Add a useExisting provider to the component decorator e.g.
//    providers: [{ provide: WizardPageComponent, useExisting: forwardRef(() => Page1Component) }]
// 4. Copy the base classes html template to the subclass and add whatever page content you like.
@Component({
   selector: 'app-page1',
   templateUrl: './page1.component.html',
   providers: [{ provide: WizardPageComponent, useExisting: forwardRef(() => Page1Component) }]
})
export class Page1Component extends WizardPageComponent {

}
