import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DynamicModule } from 'ng-dynamic-component';
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
import { DynamicTestComponent } from './view/dynamic-test/dynamic-test.component';
import { Dynamic1Component } from './view/dynamic1/dynamic1.component';


const appRoutes: Routes = [
   { path: '', component: MainComponent },
   { path: 'wizard-test', component: WizardTestComponent },
   { path: 'model-test', component: ModelTestComponent },
   { path: 'dynamic-test', component: DynamicTestComponent }
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
      ModelTestComponent,
      DynamicTestComponent,
      Dynamic1Component
   ],
   imports: [
      RouterModule.forRoot(appRoutes/*, { enableTracing: true }*/),
      BrowserModule,
      FormsModule,
      StepsModule,
      DynamicModule.withComponents([Dynamic1Component])
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
