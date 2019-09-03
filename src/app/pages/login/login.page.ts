import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    this.form = this.fb.group({
      identifier: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  async login() {
    try {
      if (this.form.invalid) return;
      const user = this.form.getRawValue();

      const response = await this.auth.login(user.identifier, user.password);
      localStorage.setItem("token", JSON.stringify(response.jwt));
      console.log(response)
    } catch (error) {}
  }
}
