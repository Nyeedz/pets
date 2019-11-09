import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicRatingModule } from 'ionic-rating';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IonicModule } from '@ionic/angular';
import { MonitoringPage } from './monitoring.page';
import { AvaliacoesDetailComponent } from 'src/app/components/modal/avaliacoes-detail/avaliacoes-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MonitoringPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicRatingModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MonitoringPage, AvaliacoesDetailComponent],
  entryComponents: [AvaliacoesDetailComponent]
})
export class MonitoringPageModule {}
