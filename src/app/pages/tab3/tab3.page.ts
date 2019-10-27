import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page implements OnInit {
  ip: string = "";
  constructor() {}

  ngOnInit() {
    this.ip = localStorage.getItem("ip");
  }

  fieldChange(event) {
    if (event) {
      localStorage.setItem("ip", event.target.value);
    }
  }
}
