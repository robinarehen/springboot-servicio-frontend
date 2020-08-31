import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as JwtDecode from 'jwt-decode'

import { UsersService } from '../../services/users.service';
import { UserInterface } from '../../interface/user.interface';
import { AuthTokenInterface } from 'src/app/interface/login.interface';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  listUsers: UserInterface[] = [];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.isAdminUser();
  }

  getUsers() {
    this.usersService.gerAllUsers().subscribe(
      data => {
        this.listUsers = data;
      },
      error => {
        this.showError(error);
      }
    );
  }

  isAdminUser() {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      const decodedToken = JwtDecode(token) as AuthTokenInterface;
      const adminRole = 'ROLE_ADMIN';
      const adminUser = decodedToken.authorities.find( value => value == adminRole);    
      if(adminUser) {
        return true;
      }
      return false;
    }
    this.notificationsService.error('You must Log in');
    this.router.navigateByUrl('pages');
  }

  private showError(error: any) {
    switch (error.status) {
      case 400:
        this.notificationsService.error('Bad Request');
        break;
      case 401:
        this.notificationsService.error('Unauthorized');
        break;    
      default:
        this.notificationsService.error('Unexpected error');
        break;
      }
      this.router.navigateByUrl('pages');
  }
}
