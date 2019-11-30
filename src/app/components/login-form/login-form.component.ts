import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/shared/error-handler.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Output() setLoading: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private userService: UserService,
    private router: Router,
    private messageHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    try {
      if (this.form.invalid) {
        return;
      }

      this.loading = true;
      this.setLoading.emit(true);
      const user = this.form.getRawValue();
      const response = await this.auth.login(user.identifier, user.password);
      localStorage.setItem('token', response.jwt);
      this.userService.setUser(response.user)

      this.router.navigate(["/home/pets"]);
      this.messageHandler.message("Logado com sucesso", "top", 2000);
    } catch (error) {
      if (error.error.statusCode === 400) {
        this.messageHandler.message(
          'Usuário ou senha invalidos!',
          'bottom',
          2000
        );
      }
    } finally {
      this.loading = false;
      this.setLoading.emit(false);
    }
  }
}
