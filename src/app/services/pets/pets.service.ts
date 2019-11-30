import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class PetsService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

  getPets(): Promise<any> {
    return this.http.get(`${this.apiUrl}/pets`).toPromise();
  }

  findByUser(): Promise<any> {
    const user = JSON.parse(localStorage.getItem('user'))._id;

    return this.http.get(`${this.apiUrl}/pets?user=${user}`).toPromise();
  }

  setFoodInterval(interval: number | 'teste'): Promise<any> {
    return this.http.get(`${environment.serverIp}/timer?interval=${interval}`).toPromise();
  }
}
