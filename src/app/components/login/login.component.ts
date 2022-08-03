import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import * as Toastify from 'toastify-js';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginPayload = {
    username: '',
    password: '',
  };
  error = '';
  constructor(private auth: AuthService, private route: Router) {}

  ngOnInit(): void {
    if (this.auth.getToken()) {
      this.route.navigate(['/home']);
    }
  }

  login(): void {
    this.auth.login(this.loginPayload).subscribe(
      (data: any) => {
        this.auth.setToken(data.token);
        this.auth.setRefreshToken(data.refreshToken);
        this.auth.saveRoutes(JSON.stringify(data.routes[0])).then((data) => {
          data == true
            ? this.route.navigate(['home'])
            : alert('Slow Internet Refreash page');
        });
      },
      (err) => {
        this.error = err.error;
      }
    );
  }


  
  admin = false;
  teacher = false;
  student = false;
  parent = false;

  _ADMIN(): void {
    this.admin = !this.admin;
    this.teacher = false;
    this.student = false;
    this.parent = false;
    this.loginPayload.username = '';
    this.loginPayload.password = '';
    this.error = '';
  }

  _TEACHER(): void {
    this.teacher = !this.teacher;
    this.admin = false;
    this.student = false;
    this.parent = false;
    this.loginPayload.username = '';
    this.loginPayload.password = '';
    this.error = '';
  }
  _STUDENT(): void {
    this.student = !this.student;
    this.admin = false;
    this.teacher = false;
    this.parent = false;
    this.loginPayload.username = '';
    this.loginPayload.password = '';
    this.error = '';
  }
  _PARENT(): void {
    this.parent = !this.parent;
    this.admin = false;
    this.teacher = false;
    this.student = false;
    this.loginPayload.username = '';
    this.loginPayload.password = '';
    this.error = '';
  }
}

// Toastify({
//   text: 'This is a toast',
//   duration: 3000,
//   newWindow: true,
//   close: true,
//   gravity: 'bottom', // `top` or `bottom`
//   position: 'right', // `left`, `center` or `right`
//   stopOnFocus: true, // Prevents dismissing of toast on hover
//   style: {
//     // background: "linear-gradient(to right, #ffb703, #fb8500)",
//     background: '#fca311',
//   },
//   onClick: function () {}, // Callback after click
// }).showToast();
