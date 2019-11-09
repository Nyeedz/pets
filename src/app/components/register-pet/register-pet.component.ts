import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-register-pet",
  templateUrl: "./register-pet.component.html",
  styleUrls: ["./register-pet.component.scss"]
})
export class RegisterPetComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      nome: ["", Validators.required],
      raca: ["", Validators.required],
      peso: ["", Validators.required],
      racao: ["", Validators.required],
      aniversario: ["", Validators.required],
      racaoName: ["", Validators.required]
      // foto: ["", Validators.required]
    });
  }
}
