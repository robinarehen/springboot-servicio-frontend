import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.logout();
  }

  login(userName: any, userPassword: any) {
    this.loading = true;
    this.loginService.getToken(userName.value, userPassword.value)
      .then(data => {
        this.loginService.saveToken(data);
        this.notificationsService.information('Welcome to Java Developer');
        this.router.navigateByUrl('pages/home');
      }).catch(error => {
        this.showNotification(error);
      }).finally( () => {
        this.loading = false;
      });
  }

  logout() {
    this.loginService.deleteToken();
  }

  showNotification(error: any) {
    switch (error.status) {
      case 400:
        this.notificationsService.error('User Name or Password are Invalid');
        break;
      case 401:
        this.notificationsService.error('User Name Invalid');
        break;
      default:
        this.notificationsService.error('Unexpected error');
        break;
    }
  }

}
