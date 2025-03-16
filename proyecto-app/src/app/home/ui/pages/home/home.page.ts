import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonRouterLink, ToastController } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import { user } from '@angular/fire/auth';
import { ProfileDto } from 'src/app/auth/modelos/profile';
import { HomeService } from 'src/app/home/services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonButton, IonRouterLink, RouterLink],
})
export class HomePage implements OnInit {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);
  private readonly _toastController: ToastController = inject(ToastController);
  private readonly _homeService: HomeService = inject(HomeService);

  userName: string = '';
  userLastname: string = '';

  ngOnInit(): void {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    const userProfile: ProfileDto | null = await this._homeService.getUserProfile();
    if (userProfile) {
      this.userName = userProfile.name;
      this.userLastname = userProfile.lastname;
    }
  }

  signOut(): void{
    this._authService
    .logout()
    .then(()=>{
      this._router.navigate(['/login']);
      this.showToast('Ha cerrado sesión correctamente');

    })
    .catch(()=>{
      this.showToast('Ha ocurrido un error, vuelva a intentarlo', true);
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
