import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFab, IonFabButton, IonFabList, IonIcon, IonImg } from '@ionic/angular/standalone';
import { GalleryService } from 'src/app/gallery/services/gallery.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IconService } from 'src/app/shared/services/icons/icon.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [IonImg, IonIcon, IonFabList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonFab, IonFabButton]
})
export class GalleryPage implements OnInit {
  private readonly _authService: AuthService = inject(AuthService)
  private readonly _galleryService: GalleryService = inject(GalleryService)
  private readonly _iconservice: IconService= inject(IconService);
  
  
  userImages: string[] = [];

  ngOnInit(): void {
    this.loadUserImages();
  }

  async loadUserImages() {
    const user = await this._authService.getCurrentUser();
    if (user) {
        const galleryData = await this._galleryService.getImagesByQuery();
        console.log('Gallery Data:', galleryData); 
        if (galleryData.length > 0) {
            this.userImages = galleryData.map(image => image.photo);
        } else {
            console.log('No images found.'); 
        }
    } else {
        console.log('No user is logged in.');
    }
  }

  onFabClick() {

  }

  actionOne() {

  }

  actionTwo() {

  }


}
