import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {DropdownDirective} from "./directives/dropdown.directive";
import {AppRoutingModule} from "../app-routing.module";


@NgModule({
  declarations: [
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  exports: [
    DropdownDirective
  ]
})
export class SharedModule {
}
