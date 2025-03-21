import { inject, Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { collection, CollectionReference, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { ProfileDto } from 'src/app/auth/modelos/profile';
import { AuthService } from 'src/app/auth/services/auth.service';

const collectionName: string = 'users';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly _authService: AuthService= inject(AuthService)
  private readonly _firestore: Firestore = inject(Firestore)
  private readonly _collection: CollectionReference = collection(this._firestore,collectionName)

  async getUserProfile(): Promise<ProfileDto | null> {
      const user: User | null = await this._authService.getCurrentUser();
      if (!user) return null;
  
      const userRef = query(this._collection, where('uid', '==', user.uid));
  
      const userSnapshot = await getDocs(userRef);
      if (userSnapshot.empty) return null;
  
      return userSnapshot.docs[0].data() as ProfileDto;
    }
}
