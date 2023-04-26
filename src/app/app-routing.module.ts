import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import {LogInComponent} from "./authentication/components/log-in/log-in.component";
import {SignUpComponent} from "./authentication/components/sign-up/sign-up.component";
import {VerifyPhoneComponent} from "./authentication/components/verify-phone/verify-phone.component";
import {
  SendVerificationCodeComponent
} from "./authentication/components/send-verification-code/send-verification-code.component";
import {ForgotPasswordComponent} from "./authentication/components/forgot-password/forgot-password.component";

const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',

    pathMatch: 'full'
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./authentication/authentication.module').then((m) => m.AuthenticationModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },

  { path: 'singup', component: SignUpComponent ,
    data:{
      title: 'sing-up page'
    }

  }
  ,

  { path: 'login', component: LogInComponent ,
  data:{
    title: 'login page'
  }

  },
  { path: 'send-code', component: SendVerificationCodeComponent ,
    data:{
      title: 'Send code'
    }
  },
  { path: 'verify-phone', component: VerifyPhoneComponent ,
    data:{
      title: 'verify phone'
    }
  },
  { path: 'forgot-password', component: ForgotPasswordComponent ,
    data:{
      title: 'forgot-password'
    }
  },



  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
