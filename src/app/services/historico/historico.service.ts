import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class HistoricoService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

  getByPet(petId: string): Promise<any> {
    return this.http.get(`${this.apiUrl}/historicos?pet=${petId}`).toPromise();
  }

  save(pet: string, racao: string) {
    return this.http.post(`${this.apiUrl}/historicos`, { pet, racao}).toPromise();
  }
}
