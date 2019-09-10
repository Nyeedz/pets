import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

  register(user: any): Promise<any> {
    return this.http
      .post(`${this.apiUrl}/auth/local/register`, user)
      .toPromise();
  }
}
