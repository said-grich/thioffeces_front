import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PagesRoutingModule} from "../views/pages/pages-routing.module";
import {AlertModule, ButtonModule, CardModule, FormModule, GridModule, SpinnerModule} from "@coreui/angular";
import {IconModule} from "@coreui/icons-angular";
import {LogInComponent} from "./components/log-in/log-in.component";
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {ReactiveFormsModule} from "@angular/forms";
import {authReducer, AuthState} from "./reducers/auth.reducer";
import {StoreModule} from "@ngrx/store";
import {AuthActions} from "./actions/auth.actions";
import {effectsModule, store} from "../state";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [LogInComponent, SignUpComponent],
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
    SpinnerModule
  ]
})
export class AuthenticationModule { }
