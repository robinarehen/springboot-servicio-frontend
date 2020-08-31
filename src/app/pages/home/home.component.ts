import { Component, OnInit } from '@angular/core';
import * as JwtDecode from 'jwt-decode'
import { AuthTokenInterface } from '../../interface/login.interface';
import { Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userInformation: AuthTokenInterface = {};

  constructor(
    private router: Router,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.getUserInformatio();
  }

  getUserInformatio() {
    const token = sessionStorage.getItem('accessToken');
    if(token){
      this.userInformation = JwtDecode(token) as AuthTokenInterface;
      if(this.userInformation.authorities) {
        return;
      }
    }
    this.notificationsService.error('You must Log in');
    this.router.navigateByUrl('pages');
  }

}
