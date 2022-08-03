import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _LoginURL = `${environment.BASE_URL}/User/login`;
  private _home = `${environment.BASE_URL}/Roles/GetAll`;
  private _refreshToken = `${environment.BASE_URL}/User/refresh-token`;

  constructor(
    private http: HttpClient,
    private route: Router,
    private jwtdecode: JwtHelperService,
    private MyAppRoutingModule: AppRoutingModule
  ) {}

  login(loginPayload: any) {
    return this.http.post(this._LoginURL, loginPayload);
  }

  getallroles() {
    return this.http.get(this._home);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  isTokenExist() {
    return !!localStorage.getItem('token');
  }

  GenerateRefreshToken() {
    return this.http.post(this._refreshToken, {
      accessToken: this.getToken(),
      refreshToken: this.getRefreshToken(),
    });
  }

  saveRefreshedToken(tokens: any) {
    this.setToken(tokens.token);
    this.setRefreshToken(tokens.refreshToken);
  }

  haveAccess() {
    let token = this.getToken() || '';
    let tokenized = this.jwtdecode.decodeToken(token);
    var role =
      tokenized['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return role;
  }

  async saveRoutes(route: string) {
    localStorage.setItem('route', route);
    this.MyAppRoutingModule.InstallRoutes(
      this.route,
      JSON.parse(localStorage.getItem('route') + '')
    );
    return true;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('route');
    this.route.navigate(['/login']);
  }
}
