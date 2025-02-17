import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
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

@Component({
  selector: 'app-formreactive',
  standalone: true,
  templateUrl: './formreactive.component.html',
  styleUrls: ['./formreactive.component.scss'],
  imports: [
    CommonModule,
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
    RouterLink
  ],
})
export class FormreactiveComponent {
  constructor() {
    addIcons({ arrowBackOutline });
    addIcons({ personOutline });
    addIcons({ atOutline });
    addIcons({ lockClosedOutline });
    addIcons({ calendarOutline });
    addIcons({ cardOutline });
    addIcons({ callOutline });
  }
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

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
    const control= this.profileForm.get('name');
    if (control){
      return control.invalid && control.touched
    }
    return false
  }

  get isLastNameRequired(): boolean{
    const control= this.profileForm.get('lastname');
    if (control){
      return control.invalid && control.touched
    }
    return false
  }

  get isEmailRequired(): boolean{
    const control= this.profileForm.get('email');
    if (control){
      return control.hasError('required') && control.touched
    }
    return false
  }

  get isEmailValid(): boolean{
    const control= this.profileForm.get('email');
    if (control){
      return control.hasError('email') && control.touched
    }
    return false
  }

  get isBirthdayRequired(): boolean{
    const control= this.profileForm.get('birthday');
    if (control){
      return control.hasError('required') && control.touched
    }
    return false
  }

  get isPasswordRequired(): boolean{
    const control= this.profileForm.get('password');
    if (control){
      return control.hasError('required') && control.touched
    }
    return false
  }

  get isDNIRequired(): boolean{
    const control= this.profileForm.get('dni');
    if (control){
      return control.hasError('required') && control.touched
    }
    return false
  }

  get isDNIValid(): boolean{
    const control= this.profileForm.get('dni');
    if (control){
      return control.hasError('pattern') && control.touched
    }
    return false
  }

  get isPhoneRequired(): boolean{
    const control= this.profileForm.get('phone');
    if (control){
      return control.hasError('required') && control.touched
    }
    return false
  }

  get isPhoneValid(): boolean{
    const control= this.profileForm.get('phone');
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
