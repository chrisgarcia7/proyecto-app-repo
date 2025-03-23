import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonInput,
  IonInputPasswordToggle,
  IonRouterLink,
  ToastController} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { IconService } from 'src/app/shared/services/icons/icon.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoginDto } from 'src/app/auth/modelos/login';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ 
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonNote,
    IonInput,
    IonInputPasswordToggle,
    IonRouterLink,
    RouterLink,
  ],
})
export class LoginPage {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _iconservice: IconService= inject(IconService);
  private readonly _toastController: ToastController = inject(ToastController);
  private readonly _router: Router = inject (Router);

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get isEmailRequired(): boolean {
    const control: AbstractControl | null = this.loginForm.get('email');
    if (control) {
      return control.hasError('required') && control.touched;
    }
    return false;
  }

  get isEmailValid(): boolean {
    const control: AbstractControl | null = this.loginForm.get('email');
    if (control) {
      return control.hasError('email') && control.touched;
    }
    return false;
  }

  get isPasswordRequired(): boolean {
    const control: AbstractControl | null = this.loginForm.get('password');
    if (control) {
      return control.hasError('required') && control.touched;
    }
    return false;
  }

  get isFormInvalid(): boolean{
    return this.loginForm.invalid;
  }


  login(): void {
    if(this.isFormInvalid){
      this.showToast("No es posible iniciar sesión.", true);

      return;
    }
    const login: LoginDto = this.loginForm.value as LoginDto;
    this._authService
      .login(login)
      .then((user) => {
        this.showToast("Bienvenido(a), haz iniciado sesión", false);
        this._router.navigate(['/tabs/home'])
    })
    .catch((error)=>{
      this.showToast("Ha ocurrido un error, vuelva a intentarlo", true)
    });
  }

  async showToast(message: string, isError: boolean = false): Promise<void>{
    const toast= await this._toastController.create({
      message: message,
      duration: 2000,
      color: isError ? 'danger': 'success',
    });
    toast.present();
  }
}
