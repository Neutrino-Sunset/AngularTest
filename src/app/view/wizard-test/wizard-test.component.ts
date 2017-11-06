import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wizard-test',
  templateUrl: './wizard-test.component.html',
  styleUrls: ['./wizard-test.component.css']
})
export class WizardTestComponent {
   public title = 'Simple Wizard Logic Demo';

   public onWizardPageChanged(eventArg: { pageIndex: number, pageTitle: string }): void {
      console.log('wizardPageChanged - page index: ' + eventArg.pageIndex + ', page title: ' + eventArg.pageTitle);
   }

   public onWizardFinished() {
      console.log('Wizard finished');
   }
}
