import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Camera, CameraResultType } from '@capacitor/camera';
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
  IonItem,
  IonLabel,
  IonIcon,
  IonInput,
  IonNote,
  IonButton,
  ToastController,
  IonImg
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { IconService } from 'src/app/shared/services/icons/icon.service';
import { ProfileService } from 'src/app/shared/services/infoprofile/profile.service';
import { ProfileDto } from 'src/app/auth/modelos/profile';
import { fechaNacimientoValidator } from 'src/app/profile/validators/customs.validators';
import { CloudinaryService } from 'src/app/shared/services/cloudinary/cloudinary.service';
import { CloudinaryDto } from 'src/app/shared/models/cloudinary_model';
import { CloudinaryResponseDto } from 'src/app/shared/models/cloudinary_response';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonLabel,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonInput,
    IonNote,
    ReactiveFormsModule,
    IonImg,
  ],
})
export class ProfilePage implements OnInit {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);
  private readonly _toastController: ToastController = inject(ToastController);
  private readonly _iconservice: IconService = inject(IconService);
  private readonly _profileservice: ProfileService = inject(ProfileService);
  private readonly _cloudinaryService: CloudinaryService = inject(CloudinaryService);

  userName: string = '';
  userLastName: string = '';
  userPhone: number = 0;
  userBirthday: Date = new Date(0);
  userDNI: number = 0;
  userData: ProfileDto | null = null;

  ngOnInit(): void {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    const userProfile: ProfileDto | null =
      await this._profileservice.getUserProfile();
    this.userData= userProfile
    if (userProfile) {
      this.userName = userProfile.name;
      this.userLastName = userProfile.lastname;
      this.userPhone = userProfile.phone;
      this.userBirthday = userProfile.birthday;
      this.userDNI = userProfile.dni;
      this.profileImage = userProfile.imageProfile;
    }
  }

  profileForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    birthday: ['', [Validators.required,fechaNacimientoValidator()]],
    dni: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
  });

  profileImage: string = '';

  get isNameRequired(): boolean {
    const control: AbstractControl | null = this.profileForm.get('name');
    if (control) {
      return control.hasError('required') && control.touched;
    }
    return false;
  }

  get isLastNameRequired(): boolean {
    const control: AbstractControl | null = this.profileForm.get('lastname');
    if (control) {
      return control.hasError('required') && control.touched;
    }
    return false;
  }

  get isBirthdayRequired(): boolean {
    const control: AbstractControl | null = this.profileForm.get('birthday');
    if (control) {
      return control.hasError('required') && control.touched;
    }
    return false;
  }

  get isBirthdayValid(): boolean {
    const control: AbstractControl | null = this.profileForm.get('birthday');
    if (control) {
      return control.hasError('fechaInvalida') && control.touched;
    }
    return false;
  }

  get isDNIRequired(): boolean {
    const control: AbstractControl | null = this.profileForm.get('dni');
    if (control) {
      return control.hasError('required') && control.touched;
    }
    return false;
  }

  get isDNIValid(): boolean {
    const control: AbstractControl | null = this.profileForm.get('dni');
    if (control) {
      return control.hasError('pattern') && control.touched;
    }
    return false;
  }

  get isPhoneRequired(): boolean {
    const control: AbstractControl | null = this.profileForm.get('phone');
    if (control) {
      return control.hasError('required') && control.touched;
    }
    return false;
  }

  get isPhoneValid(): boolean {
    const control: AbstractControl | null = this.profileForm.get('phone');
    if (control) {
      return control.hasError('pattern') && control.touched;
    }
    return false;
  }

  get isFormInvalid(): boolean {
    return this.profileForm.invalid;
  }

  saveChanges(): void {
    try {

      const user: ProfileDto = {
        ...this.userData,
        ...this.profileForm.value,
        imageProfile: this.profileImage,
      };
      const model: CloudinaryDto={
        folder: "users-profile",
        fileName : user.uid,
        file: this.profileImage,

      };
      this._cloudinaryService.upload(model).subscribe({
        next: (response : CloudinaryResponseDto)=>{
          user.imageProfile= response.secure_url;
          this._authService.updateUser(user).then(async ()=>{
            await this.showToast('Foto de perfil actualizada correctamente');

          }).catch( async() =>{
            await this.showToast('Ha ocurrido un error, vuelva a intentar subir su foto', true);

          });
        },
        error: async ()=>{
          await this.showToast('Ha ocurrido un error, vuelva a intentar subir su foto', true);
        }
      });
      
      this.showToast('Se guardaron los cambios');
    } catch (error) {
      this.showToast('Ha ocurrido un error, vuelva a intentarlo', true);
      console.error('este es el error:', error);
    }
  }

  signOut(): void {
    this._authService
      .logout()
      .then(() => {
        this._router.navigate(['/login']);
        this.showToast('Ha cerrado sesión correctamente');
      })
      .catch(() => {
        this.showToast('Ha ocurrido un error, vuelva a intentarlo', true);
      });
  }

  async showToast(message: string, isError: boolean = false): Promise<void> {
    const toast = await this._toastController.create({
      message: message,
      duration: 2000,
      color: isError ? 'danger' : 'success',
    });
    toast.present();
  }

  async onPickImage() {
    const camera = await Camera.getPhoto({
      quality: 100,

      allowEditing: false,

      resultType: CameraResultType.Base64,

      saveToGallery: true,

      promptLabelHeader: 'Seleccionar una opción',

      promptLabelPicture: 'Tomar una foto',

      promptLabelPhoto: 'Elegir de galería',
    });

    if (!camera) return;

    this.profileImage = camera.webPath ?? camera.path ?? `data:image/jpeg;base64,${camera.base64String ?? ''}`;
  }
}
