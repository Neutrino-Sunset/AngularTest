import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StepsModule } from 'primeng/primeng';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from 'app/app.component';
import { WizardComponent } from 'app/view/wizard/wizard.component';
import { WizardPageComponent } from 'app/view/wizard/wizard-page/wizard-page.component';
import { Page1Component } from 'app/view/page1/page1.component';
import { Page2Component } from 'app/view/page2/page2.component';
import { Page3Component } from 'app/view/page3/page3.component';
import { WizardTestComponent } from './view/wizard-test/wizard-test.component';
import { MainComponent } from './view/main/main.component';
import { ModelTestComponent } from './view/model-test/model-test.component';


const appRoutes: Routes = [
   { path: '', component: MainComponent },
   { path: 'wizard-test', component: WizardTestComponent },
   { path: 'model-test', component: ModelTestComponent }
];


@NgModule({
   declarations: [
      AppComponent,
      WizardComponent,
      WizardPageComponent,
      Page1Component,
      Page2Component,
      Page3Component,
      WizardTestComponent,
      MainComponent,
      ModelTestComponent
   ],
   imports: [
      RouterModule.forRoot(appRoutes/*, { enableTracing: true }*/),
      BrowserModule,
      FormsModule,
      StepsModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
