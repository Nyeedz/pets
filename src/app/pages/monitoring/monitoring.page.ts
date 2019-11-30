import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import * as moment from "moment";
import { AvaliacoesDetailComponent } from "src/app/components/modal/avaliacoes-detail/avaliacoes-detail.component";
import { UserService } from "src/app/services/user/user.service";
import { environment } from "src/environments/environment";
import { PetsService } from "src/app/services/pets/pets.service";
import { RacaoService } from "src/app/services/racao/racao.service";

@Component({
  selector: "app-monitoring",
  templateUrl: "./monitoring.page.html",
  styleUrls: ["./monitoring.page.scss"]
})
export class MonitoringPage implements OnInit {
  pets: any[] = [];
  expandedPet = 0;
  racoes = {};

  constructor(
    private userService: UserService,
    private racaoService: RacaoService,
    private petsService: PetsService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.getDataFromPets();
    this.loadRacoes();
  }

  async loadRacoes() {
    try {
      const res = await this.racaoService.getAll();
      let racoes = {};

      res.forEach(racao => {
        racoes[racao._id] = racao;
      });

      this.racoes = racoes;
    } catch (error) {
      console.error(error);
    }
  }

  async showAvaliacoes(pet: any) {
    const modal = await this.modalController.create({
      component: AvaliacoesDetailComponent,
      componentProps: { pet }
    });

    return await modal.present();
  }

  async getDataFromPets() {
    try {
      const response = await this.petsService.findByUser();
      console.log(response);

      this.pets = response.map(pet => {
        const formatted = moment(pet.aniversario).format("DD/MM/YYYY");
        const foto = pet.foto ? `${environment.url}${pet.foto.url}` : false;
        return { ...pet, aniversario: formatted, foto };
      });
    } catch (error) {}
  }
}
