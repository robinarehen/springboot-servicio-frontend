import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  success(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['bg-success']
    });
  }

  information(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['bgc-primary']
    });
  }

  error(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['bg-danger']
    });
  }
}
