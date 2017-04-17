import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { GlobalModule } from './global/global.module';
import { PlayerModule } from './player/player.module';

import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    GlobalModule,
    PlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
