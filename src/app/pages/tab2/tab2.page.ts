import { Component, OnInit } from "@angular/core";
import { PetsService } from "src/app/services/pets/pets.service";
import { environment } from "src/environments/environment";
import { ModalController } from "@ionic/angular";
import { PetsDetailComponent } from "src/app/components/modal/pets-detail/pets-detail.component";
import { CreatePetComponent } from "src/app/components/modal/create-pet/create-pet.component";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page implements OnInit {
  pets: any[] = [];
  url: string = `${environment.url}`;
  constructor(
    private petsService: PetsService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.getPets();
  }

  async getPets() {
    try {
      const response = await this.petsService.getPets();
      this.pets = response;
    } catch (error) {
      console.log(error);
    }
  }

  async modalPets(pet) {
    const modal = await this.modalController.create({
      component: PetsDetailComponent,
      componentProps: { pet }
    });

    return await modal.present();
  }

  async addPets() {
    const modal = await this.modalController.create({
      component: CreatePetComponent
    });

    return await modal.present();
  }
}
