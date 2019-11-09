import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { AvaliacoesDetailComponent } from 'src/app/components/modal/avaliacoes-detail/avaliacoes-detail.component';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.page.html',
  styleUrls: ['./monitoring.page.scss']
})
export class MonitoringPage implements OnInit {
  pets: any[] = [];
  expandedPet = 0;

  constructor(
    private userService: UserService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.getDataFromPets();
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
      const response = await this.userService.getMe();
      console.log(response.pets);

      this.pets = response.pets.map(pet => {
        const formatted = moment(pet.aniversario).format('DD/MM/YYYY');
        const foto = pet.foto ? `${environment.url}${pet.foto.url}` : false;
        return { ...pet, aniversario: formatted, foto };
      });
    } catch (error) {}
  }
}
