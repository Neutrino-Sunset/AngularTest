import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StepsModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { WizardComponent } from './view/wizard/wizard.component';
import { WizardStepComponent } from './view/wizard/wizard-step/wizard-step.component';

@NgModule({
  declarations: [
    AppComponent,
    WizardComponent,
    WizardStepComponent
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
