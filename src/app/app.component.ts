import { Component } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {
   public title = 'Simple Wizard Logic Demo';

   public onWizardPageChanged(eventArg: {pageIndex: number, pageTitle: string}): void {
      console.log('wizardPageChanged - page index: ' + eventArg.pageIndex + ', page title: ' + eventArg.pageTitle);
   }

   public onWizardFinished() {
      console.log('Wizard finished');
   }
}
