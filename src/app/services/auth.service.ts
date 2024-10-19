import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlAPI = environment.apiURL;
  public user: User;
  constructor(private http: HttpClient) { }

  iniciar(payload) {
    return this.http.post(`${this.urlAPI}auth/jwt_login/1`, payload);
  }

  logInFront(payload){
    return this.http.post(`${this.urlAPI}auth/jwt_login/2`, payload);
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {

    if (!this.user) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
    }
    return this.user;
  }

  logOut() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('productos');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('instructor');
    this.user = null;
  }

  isLogged() {
    return new Promise(resolve => {
      this.isAuthenticated()
        .subscribe((res: any) => {
          if (res.status === true) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  isAuthenticated() {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-API-KEY': `Bearer ${token}`
      })
    };
    return this.http.get(`${this.urlAPI}auth/verifyToken`, httpOptions);
  }

  ressetPassword(payload: any){
    return this.http.post(this.urlAPI + `Auth/ressetPassword`, payload);
  }
}
