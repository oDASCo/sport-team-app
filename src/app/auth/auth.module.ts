import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {LoginComponent} from "./login/login.component";
import {AuthComponent} from "./auth.component";
import {AppRoutingModule} from "../app-routing.module";

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: []
})
export class AuthModule {
}
