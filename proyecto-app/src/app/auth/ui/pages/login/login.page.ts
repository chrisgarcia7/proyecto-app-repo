import { Component, inject, OnInit } from '@angular/core';
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
  IonItemDivider, IonList } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { IconService } from 'src/app/shared/services/icons/icon.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonList, 
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonButtons,
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
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _iconservice: IconService= inject(IconService);

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


  login(): void {}
}
