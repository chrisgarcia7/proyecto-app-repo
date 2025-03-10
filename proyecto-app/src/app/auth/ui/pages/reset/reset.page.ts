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
  IonIcon,
  IonButtons,
  IonButton,
  IonRouterLink,
  IonItem,
  IonLabel,
  ToastController,
  IonNote,
  IonInput
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { IconService } from 'src/app/shared/services/icons/icon.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonIcon,
    IonContent,
    IonHeader,
    IonLabel,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonButton,
    IonRouterLink,
    RouterLink,
    ReactiveFormsModule,
    IonNote,
    IonInput
  ],
})
export class ResetPage {
  private readonly _iconservice: IconService = inject(IconService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _toastController: ToastController = inject(ToastController);

  resetForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get isEmailRequired(): boolean {
    const control: AbstractControl | null = this.resetForm.get('email');
    if (control) {
      return control.hasError('required') && control.touched;
    }
    return false;
  }

  get isEmailValid(): boolean {
    const control: AbstractControl | null = this.resetForm.get('email');
    if (control) {
      return control.hasError('email') && control.touched;
    }
    return false;
  }

  get isFormInvalid(): boolean {
    return this.resetForm.invalid;
  }

  async resetPassword(): Promise<void> {
      try {
        const email: string = this.resetForm.value.email;
        await this._authService.resetPassword(email);
        await this.showToast('Correo de restablecimiento enviado');
      } catch (error) {
        await this.showToast('Error al enviar el correo', true);
      }
    
    
  }

  async showToast(message: string, isError: boolean = false): Promise<void> {
    const toast = await this._toastController.create({
      message: message,
      duration: 2000,
      color: isError ? 'danger' : 'success',
    });
    toast.present();
  }
}
