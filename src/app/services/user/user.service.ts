import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any): Promise<any> {
    return this.http
      .post(`${this.apiUrl}/auth/local/register`, user)
      .toPromise();
  }

  getMe(): Promise<any> {
    return this.http.get(`${this.apiUrl}/users/me`).toPromise();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
