import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import {Store} from "@ngrx/store";
import * as fromAuth from "../../../authentication/reducers/auth.reducer";
import {Login, Logout} from "../../../authentication/actions/auth.actions";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService,private store: Store<fromAuth.AuthState>) {
    super();
  }

  logout(){
    this.store.dispatch(new Logout());
  }
}
