import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { RegisterPage } from "./register.page";
import { RegisterFormComponent } from "src/app/components/register-form/register-form.component";

const routes: Routes = [
  {
    path: "",
    component: RegisterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterPage, RegisterFormComponent]
})
export class RegisterPageModule {}
