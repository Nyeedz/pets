import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    this.form = this.fb.group({
      identifier: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    try {
      this.submitted = true;
      if (this.form.invalid) return;
      const user = this.form.getRawValue();

      const response = await this.auth.login(user.identifier, user.password);
      localStorage.setItem("token", response.jwt);
      localStorage.setItem("user", JSON.stringify(response.user));
    } catch (error) {
      this.submitted = false;
      console.log(error);
    }
  }
}
