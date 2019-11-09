import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Tab2Page } from "./tab2.page";
import { PetsDetailComponent } from "src/app/components/modal/pets-detail/pets-detail.component";
import { CreatePetComponent } from "src/app/components/modal/create-pet/create-pet.component";
import { RegisterPetComponent } from "src/app/components/register-pet/register-pet.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: "", component: Tab2Page }])
  ],
  declarations: [
    Tab2Page,
    PetsDetailComponent,
    CreatePetComponent,
    RegisterPetComponent
  ],
  entryComponents: [
    PetsDetailComponent,
    CreatePetComponent,
    RegisterPetComponent
  ]
})
export class Tab2PageModule {}
