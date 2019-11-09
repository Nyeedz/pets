import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { PetsService } from 'src/app/services/pets/pets.service';
import { ErrorHandlerService } from 'src/app/services/shared/error-handler.service';
import { AvaliacoesService } from 'src/app/services/avaliacoes/avaliacoes.service';

@Component({
  selector: 'app-avaliacoes-detail',
  templateUrl: './avaliacoes-detail.component.html',
  styleUrls: ['./avaliacoes-detail.component.scss']
})
export class AvaliacoesDetailComponent implements OnInit {
  pet: any;
  avaliacoes: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private avaliacoesService: AvaliacoesService,
    private message: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.getAvaliacoes();
  }

  async getAvaliacoes() {
    try {
      const res = await this.avaliacoesService.getAvaliacoesByPet(this.pet.id);
      this.avaliacoes = res;
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  hide() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
