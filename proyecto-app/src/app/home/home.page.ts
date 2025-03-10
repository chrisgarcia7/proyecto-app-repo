import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonRouterLink, ToastController } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonButton, IonRouterLink, RouterLink],
})
export class HomePage {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);
  private readonly _toastController: ToastController = inject(ToastController)
  constructor() {}

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
