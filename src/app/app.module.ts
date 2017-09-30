import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StepsModule } from 'primeng/primeng';

import { AppComponent } from 'app/app.component';
import { WizardComponent } from 'app/view/wizard/wizard.component';
import { WizardPageComponent } from 'app/view/wizard/wizard-page/wizard-page.component';
import { Page1Component } from 'app/view/page1/page1.component';
import { Page2Component } from 'app/view/page2/page2.component';
import { Page3Component } from 'app/view/page3/page3.component';


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
