import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  UserCredential,
  signOut,
  createUserWithEmailAndPassword,
  user,
  User,
  sendPasswordResetEmail,
} from '@angular/fire/auth';
import { LoginDto } from '../modelos/usuario';
import {
  CollectionReference,
  DocumentReference,
  Firestore,
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  orderBy,
  updateDoc,
} from '@angular/fire/firestore';
import { UserDto } from '../modelos/register';
import { ProfileDto } from '../modelos/profile';

const collectionName: string = 'users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _auth: Auth = inject(Auth);
  private readonly _firestore: Firestore = inject(Firestore);
  private readonly _collection: CollectionReference = collection(
    this._firestore,
    collectionName
  );

  async isUserLoggued(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this._auth.onAuthStateChanged((user: User | null) => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  async getCurrentUser(): Promise<User | null> {
    return new Promise<User | null>((resolve) => {
      this._auth.onAuthStateChanged((user: User | null) => {
        resolve(user);
      });
    });
  }

  

  private createUserInFirestore(model: ProfileDto): void {
    const docRef: DocumentReference = doc(this._collection, model.uid);
    setDoc(docRef, {
      uid: model.uid,
      name: model.name,
      lastname: model.lastname,
      email: model.email,
      birthday: model.birthday,
      dni: model.dni,
      phone: model.phone,
      imageProfile: model.imageProfile
    });
  }

  async login(model: LoginDto): Promise<UserCredential> {
    const isLogged: boolean = await this.isUserLoggued();
    if (isLogged) return Promise.reject('Ya hay una sesión activa');

    return await signInWithEmailAndPassword(
      this._auth,
      model.email,
      model.password
    );
  }

  async logout(): Promise<void> {
    await signOut(this._auth);
  }

  async signUp(model: ProfileDto): Promise<void> {
    const isLogged: boolean = await this.isUserLoggued();
    if (isLogged) return Promise.reject('Ya hay una sesión activa');

    await createUserWithEmailAndPassword(
      this._auth,
      model.email,
      model.password
    ).then((userCredential: UserCredential) => {
      model.uid = userCredential.user.uid;
      this.createUserInFirestore(model);
    });
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this._auth, email);

    } catch (error) {

      throw error;
    }
  }

  async updateUser(user: ProfileDto): Promise<void> {
    const docRef: DocumentReference = doc(this._collection, user.uid);
    updateDoc(docRef, {
      ...user,
    });
  }
}
