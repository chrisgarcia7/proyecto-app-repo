import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { GalleryService } from 'src/app/gallery/services/gallery.service';
import { ProfileDto } from 'src/app/auth/modelos/profile';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GalleryPage implements OnInit {
  private readonly _authService: AuthService = inject(AuthService)
  private readonly _galleryService: GalleryService = inject(GalleryService)
  
  
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
            console.log('User Images:', this.userImages); 
        } else {
            console.log('No images found.'); 
        }
    } else {
        console.log('No user is logged in.');
    }
  }


}
