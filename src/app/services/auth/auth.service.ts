import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private apiUrl = environment.url;
  constructor(private http: HttpClient, private router: Router) {}

  login(identifier: string, password: string): Promise<any> {
    return this.http
      .post(`${this.apiUrl}/auth/local`, { identifier, password })
      .toPromise();
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }
}
