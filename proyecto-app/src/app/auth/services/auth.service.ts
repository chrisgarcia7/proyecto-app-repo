import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  UserCredential,
  signOut,
  createUserWithEmailAndPassword
} from '@angular/fire/auth';
import { LoginDto } from '../modelos/usuario';
import { Firestore } from '@angular/fire/firestore';
import { UserDto } from '../modelos/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _auth: Auth = inject(Auth);
  private readonly _firestore: Firestore = inject(Firestore); 

  createUserInFirestore(model:UserDto): void{
    

  }

  async login(model: LoginDto): Promise<UserCredential> {
    return await signInWithEmailAndPassword(
      this._auth, 
      model.email, 
      model.password
    );
  }

  async logout(): Promise<void>{
    await signOut(this._auth);
  }

  async signUp(model: UserDto): Promise<UserCredential>{
    return await createUserWithEmailAndPassword(
      this._auth, 
      model.email, 
      model.password
    );
  }
}
