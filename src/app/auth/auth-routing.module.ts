import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
          path: 'register',
          component: RegisterComponent
      },
      {
          path: 'login',
          component: LoginComponent
      }
    ]
  }
]


@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild( routes )
    ],
    exports: [
      RouterModule
    ]
  })
  export class AuthRoutingModule { }