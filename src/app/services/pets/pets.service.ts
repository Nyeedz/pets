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

  setFoodInterval(interval: number): Promise<any> {
    const ip = localStorage.getItem("ip");
    return this.http.get(`http://${ip}/timer?interval=${interval}`).toPromise();
  }
}
