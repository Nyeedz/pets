import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { PetsService } from "src/app/services/pets/pets.service";
import { ErrorHandlerService } from "src/app/services/shared/error-handler.service";

@Component({
  selector: "app-pets-detail",
  templateUrl: "./pets-detail.component.html",
  styleUrls: ["./pets-detail.component.scss"]
})
export class PetsDetailComponent implements OnInit {
  pet: any;
  url: string = `${environment.url}`;
  interval: number = 3;
  constructor(
    private modalCtrl: ModalController,
    private petsService: PetsService,
    private message: ErrorHandlerService
  ) {}

  ngOnInit() {}

  hide() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  async start() {
    try {
      await this.petsService.setFoodInterval(this.interval);
      this.message.message(
        `A próxima alimentação será daqui a ${this.interval} horas`,
        "bottom",
        2000
      );

      this.hide();
    } catch (error) {
      console.log(error);
    }
  }
}
