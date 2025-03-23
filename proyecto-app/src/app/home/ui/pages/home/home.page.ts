import { Component, inject, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  ToastController,
  IonCard,
  IonItem,
  IonLabel,
  IonCardContent,
  IonAvatar,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import { ProfileDto } from 'src/app/auth/modelos/profile';
import { HomeService } from 'src/app/home/services/home.service';
import {
  ActionPerformed,
  PushNotifications,
  PushNotificationSchema,
  Token,
} from '@capacitor/push-notifications';
import { CharacterDto } from 'src/app/home/models/character';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    CommonModule,
    IonLabel,
    IonCardContent,
    IonAvatar,
  ],
})
export class HomePage implements OnInit {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);
  private readonly _toastController: ToastController = inject(ToastController);
  private readonly _homeService: HomeService = inject(HomeService);

  userName: string = '';
  userLastname: string = '';
  usuario: ProfileDto = {} as ProfileDto;
  charactersinfo: CharacterDto[] = [];

  initNotification(): void {
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      this.usuario.fcmDevice = token.value;
      this._authService.updateUser(this.usuario);
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        //metodo para recibir notificaciones push
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        //metodo para recibir notificaciones push con acciones
      }
    );
  }

  ngOnInit(): void {
    this.loadUserProfile();

    this._homeService.getInfo().subscribe((character) => {
      this.charactersinfo = character.results;
    });
  }

  async loadUserProfile() {
    const userProfile: ProfileDto | null =
      await this._homeService.getUserProfile();
    this.usuario = userProfile ?? ({} as ProfileDto);
    if (userProfile) {
      this.userName = userProfile.name;
      this.userLastname = userProfile.lastname;
      this.initNotification();
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
