import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-create-pet",
  templateUrl: "./create-pet.component.html",
  styleUrls: ["./create-pet.component.scss"]
})
export class CreatePetComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  hide() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
