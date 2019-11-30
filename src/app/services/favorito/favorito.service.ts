import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class FavoritoService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

  save(pet: string, racao: string): Promise<any> {
    return this.http.post(`${this.apiUrl}/favoritos`, { pet, racao }).toPromise();
  }
}
