import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"]
})
export class SliderComponent implements OnInit {
  slider: any;

  slideOptsOne = {
    autoplay: true,
    onlyExternal: false
  };

  constructor() {}

  ngOnInit() {
    this.slider = {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          name: "login-bg.png"
        },
        {
          name: "login-bg2.jpeg"
        }
      ]
    };
  }
}
