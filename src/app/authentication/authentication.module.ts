import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PagesRoutingModule} from "../views/pages/pages-routing.module";
import {
  AlertModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  SpinnerModule,
} from "@coreui/angular";
import {IconModule} from "@coreui/icons-angular";
import {LogInComponent} from "./components/log-in/log-in.component";
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {ReactiveFormsModule} from "@angular/forms";

import {effectsModule, metaReducers, reducers, store} from "../state";
import {HttpClientModule} from "@angular/common/http";
import { VerifyPhoneComponent } from './components/verify-phone/verify-phone.component';
import {ToastComponent} from "../includes/components/toast/toast.component";
import {ToasterComponent} from "../includes/components/toaster/toaster.component";
import {StoreModule} from "@ngrx/store";




@NgModule({
  declarations: [LogInComponent, SignUpComponent, VerifyPhoneComponent,ToastComponent, ToasterComponent],
  imports: [
    CommonModule,
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    ReactiveFormsModule,
    HttpClientModule,
    effectsModule,
    store,
    AlertModule,
    SpinnerModule,
    StoreModule.forRoot(reducers, { metaReducers })
  ]
})
export class AuthenticationModule { }
