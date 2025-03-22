import { inject, Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { collection, CollectionReference, Firestore, query, where, getDocs, orderBy } from '@angular/fire/firestore';
import { ProfileDto } from 'src/app/auth/modelos/profile';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GalleryDto } from '../modelos/gallery';

const galleriesCollectionName: string = 'galleries';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _firestore: Firestore = inject(Firestore);
  private readonly _galleriesCollection: CollectionReference = collection(
    this._firestore,
    galleriesCollectionName
  );

  async getImagesByQuery(): Promise<GalleryDto[]> {
    const user: User | null = await this._authService.getCurrentUser();
    if (!user) return [];

    const querySnapshot = query(
      this._galleriesCollection,
      where('uid', '==', user.uid),
      where('active', '==', true),
      orderBy('createdAt', 'desc')
    );

    const getDocRef = await getDocs(querySnapshot); 
    const images: GalleryDto[] = [];

    getDocRef.forEach((doc) => {
      const data = doc.data() as GalleryDto; 
      if (data.photo) {
        images.push(data); 
      }
    });

    return images;
  }
}
