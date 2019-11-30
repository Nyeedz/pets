import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class UserService {
  public user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private apiUrl = environment.url;

  constructor(private http: HttpClient, private router: Router) {} 

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
    console.log(user);
    return this.user.next(user);
  }

  register(user: any): Promise<any> {
    return this.http
      .post(`${this.apiUrl}/auth/local/register`, user)
      .toPromise();
  }

  getMe(): Promise<any> {
    return this.http.get(`${this.apiUrl}/users/me`).toPromise();
  }

  update(body): Promise<any> {
    const user = JSON.parse(localStorage.getItem("user"))._id;
    return this.http.put(`${this.apiUrl}/users/${user}`, body).toPromise();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }
}
