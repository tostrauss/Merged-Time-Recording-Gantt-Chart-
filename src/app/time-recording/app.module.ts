import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { TimeRecordingComponent } from './time-recording/time-recording.component';
import { GraphComponent } from './graph/graph.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LoginComponent,
    TimeRecordingComponent,
    GraphComponent,
    IonicModule.forRoot()
  ],
  providers: []
})
export class AppModule {}

