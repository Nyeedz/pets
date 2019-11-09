import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { UserService } from "src/app/services/user/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"]
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        nome: ["", Validators.required],
        sobrenome: [""],
        username: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        endereco: ["", Validators.required],
        numero: ["", Validators.required],
        cidade: ["", Validators.required],
        bairro: ["", Validators.required],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: this.passwordConfirming
      }
    );
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get("password").value !== c.get("confirmPassword").value) {
      return { invalid: true };
    }
  }

  async onSubmit() {
    this.submitted = true;
    try {
      if (this.form.invalid || this.form.errors.invalid) return;
      const user = this.form.getRawValue();
      await this.userService.register(user);
      this.router.navigate(["/login"]);
      this.submitted = false;
    } catch (error) {
      this.submitted = false;
      console.log(error);
    }
  }
}
