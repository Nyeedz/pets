import { Component, OnInit } from "@angular/core";
import {
  AlertController,
  ModalController,
  PickerController
} from "@ionic/angular";
import { FavoritoService } from "src/app/services/favorito/favorito.service";
import { HistoricoService } from "src/app/services/historico/historico.service";
import { PetsService } from "src/app/services/pets/pets.service";
import { RacaoService } from "src/app/services/racao/racao.service";
import { ErrorHandlerService } from "src/app/services/shared/error-handler.service";
import { environment } from "src/environments/environment";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: "app-pets-detail",
  templateUrl: "./pets-detail.component.html",
  styleUrls: ["./pets-detail.component.scss"]
})
export class PetsDetailComponent implements OnInit {
  pet: any;
  url: string = `${environment.url}`;
  interval: number = 3;
  isDev: boolean = false;
  racoes: any[] = [];
  intervalos: any[] = [3, 6, 9, 12, 24];
  racao: { name: string; id: string };
  intervalo: number;

  constructor(
    private modalCtrl: ModalController,
    private pickerController: PickerController,
    private alertController: AlertController,
    private petsService: PetsService,
    private historicoService: HistoricoService,
    private favoriteService: FavoritoService,
    private userService: UserService,
    private racaoService: RacaoService,
    private message: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.isDev = !environment.production;
    this.loadRacoes();
  }

  hide() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  async loadRacoes() {
    try {
      const res = await this.racaoService.getAll();
      console.log(res);
      this.racoes = res;
    } catch (err) {
      console.error(err);
    }
  }

  async openPicker() {
    const columns = [
      {
        name: "racao",
        options: this.racoes.map(racao => {
          return { text: racao.nome, value: racao._id };
        })
      },
      {
        name: "intervalo",
        options: this.intervalos.map(intervalo => {
          return { text: `A cada ${intervalo} horas`, value: intervalo };
        })
      }
    ];

    const picker = await this.pickerController.create({
      columns,
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Confirmar",
          handler: value => {
            this.racao = { id: value.racao.value, name: value.racao.text };
            this.intervalo = value.intervalo.value;
            console.log(value);
          }
        }
      ]
    });
    await picker.present();
  }

  async showFavoriteAlert(racao: string) {
    const alert = await this.alertController.create({
      header: "Só uma pergunta!",
      message: `Sua ultima ração foi: <br> <strong>${racao}</strong>. <br><br>Deseja marcá-la como favorita?`,
      buttons: [
        {
          text: "Não",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "Sim",
          handler: async () => {
            await this.saveFavorite();
          }
        }
      ]
    });

    await alert.present();
    await alert.onDidDismiss();
  }

  async saveFavorite() {
    try {
      const res = await this.favoriteService.save(this.pet.id, this.racao.id);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  async start(env: "prod" | "dev") {
    try {
      await this.petsService.setFoodInterval(
        env === "prod" ? this.interval : "teste"
      );
      const historico = await this.historicoService.getByPet(this.pet.id);
      const showFavoriteDialog =
        historico.length > 0 &&
        historico[historico.length - 1].racao._id !== this.racao.id;

      if (historico.length === 0) {
        this.saveFavorite();
      }

      if (showFavoriteDialog) {
        await this.showFavoriteAlert(
          historico[historico.length - 1].racao.nome
        );
      }

      await this.historicoService.save(this.pet.id, this.racao.id);
      const user = await this.userService.update({ activated: true });
      this.userService.setUser(user);

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
