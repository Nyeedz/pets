import { Component } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  url: string = `${environment.url}`;

  constructor() {}

  getCurrentUser() {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user) return user;

    return false;
  }
}
