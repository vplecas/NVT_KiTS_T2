import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  error: string = null;
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
  }
  }

  ngOnInit(): void {
    this.authService.getProfile()
    .subscribe(
      data => {
         this.user = data;
      },
      error => {
         console.log(error);
         this.error = 'Somethnig went wrong, can not load profile right now.';
      });
  }

}
