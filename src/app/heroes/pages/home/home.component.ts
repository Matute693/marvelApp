import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Heroes } from '../../interfaces/heroes.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthUser } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container {
      margin: 10px;
    }
    `
  ]
})
export class HomeComponent implements OnInit {

    get auth() {
      return this.authService.auth;
    }

  constructor( 
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  logOut()  {
    //Go to the back side
    //A user

    this.router.navigate(['./auth/login'])

  }

}
