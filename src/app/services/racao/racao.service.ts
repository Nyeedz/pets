import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class RacaoService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

  getAll(): Promise<any> {
    return this.http.get(`${this.apiUrl}/racaos`).toPromise();
  }
}
