import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonHeader,
  IonToolbar,
  IonNote,
  IonRouterLink,
  IonButton,
  IonIcon,
  IonButtons,
  IonContent,
  IonInputPasswordToggle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { personOutline } from 'ionicons/icons';
import { atOutline } from 'ionicons/icons';
import { lockClosedOutline } from 'ionicons/icons';
import { calendarOutline } from 'ionicons/icons';
import { cardOutline } from 'ionicons/icons';
import { callOutline } from 'ionicons/icons';
import { IconService } from 'src/app/shared/services/icons/icon.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule,
    IonNote,
    IonItem,
    IonContent,
    IonLabel,
    IonInput,
    IonHeader,
    IonToolbar,
    IonInputPasswordToggle,
    ReactiveFormsModule,
    IonButton,
    IonIcon,
    IonButtons,
    IonRouterLink,
    RouterLink]
})
export class RegisterPage {

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _iconservice: IconService= inject(IconService);

  profileForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required,Validators.email]],
    password: ['', [Validators.required]],
    birthday: ['', [Validators.required]],
    dni: ['', [Validators.required,Validators.pattern(/^\d{13}$/)]],
    phone: ['', [Validators.required,Validators.pattern(/^\d{8}$/)]],
  });

  get isNameRequired(): boolean{
    const control: AbstractControl | null = this.profileForm.get('name');
    if (control){
      return control.invalid && control.touched
    }
    return false
  }

  get isLastNameRequired(): boolean{
    const control: AbstractControl | null= this.profileForm.get('lastname');
    if (control){
      return control.invalid && control.touched
    }
    return false
  }

  get isEmailRequired(): boolean{
    const control: AbstractControl | null= this.profileForm.get('email');
    if (control){
      return control.hasError('required') && control.touched
    }
    return false
  }

  get isEmailValid(): boolean{
    const control: AbstractControl | null= this.profileForm.get('email');
    if (control){
      return control.hasError('email') && control.touched
    }
    return false
  }

  get isBirthdayRequired(): boolean{
    const control: AbstractControl | null= this.profileForm.get('birthday');
    if (control){
      return control.hasError('required') && control.touched
    }
    return false
  }

  get isPasswordRequired(): boolean{
    const control: AbstractControl | null= this.profileForm.get('password');
    if (control){
      return control.hasError('required') && control.touched
    }
    return false
  }

  get isDNIRequired(): boolean{
    const control: AbstractControl | null= this.profileForm.get('dni');
    if (control){
      return control.hasError('required') && control.touched
    }
    return false
  }

  get isDNIValid(): boolean{
    const control: AbstractControl | null= this.profileForm.get('dni');
    if (control){
      return control.hasError('pattern') && control.touched
    }
    return false
  }

  get isPhoneRequired(): boolean{
    const control: AbstractControl | null= this.profileForm.get('phone');
    if (control){
      return control.hasError('required') && control.touched
    }
    return false
  }

  get isPhoneValid(): boolean{
    const control: AbstractControl | null= this.profileForm.get('phone');
    if (control){
      return control.hasError('pattern') && control.touched
    }
    return false
  }

  get isFormInvalid(): boolean{
    return this.profileForm.invalid;
  }


  saveProfile(): void {}



}
