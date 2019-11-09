import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  url: string = `${environment.url}`;
  user: any;
  ip: any;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.ip = localStorage.getItem("ip");
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user) {
      this.user.avatar = this.user.foto.url = `${this.url}${this.user.foto.url}`;
    }
  }

  logout() {
    this.userService.logout();
  }
}
