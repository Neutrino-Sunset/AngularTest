import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StepsModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { WizardComponent } from './view/wizard/wizard.component';
import { WizardPageComponent } from './view/wizard/wizard-step/wizard-step.component';
import { Page1Component } from './view/page1/page1.component';
import { Page2Component } from './view/page2/page2.component';
import { Page3Component } from './view/page3/page3.component';

@NgModule({
  declarations: [
    AppComponent,
    WizardComponent,
    WizardPageComponent,
    Page1Component,
    Page2Component,
    Page3Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    StepsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
