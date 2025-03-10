import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  UserCredential,
  signOut,
  createUserWithEmailAndPassword,
  user,
  User,
  sendPasswordResetEmail
} from '@angular/fire/auth';
import { LoginDto } from '../modelos/usuario';
import { CollectionReference, DocumentReference, Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { UserDto } from '../modelos/register';

const collectionName: string= 'users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly _auth: Auth = inject(Auth);
  private readonly _firestore: Firestore = inject(Firestore);
  private readonly _collection: CollectionReference = collection(this._firestore, collectionName);

  private async getCurrentUser(): Promise<boolean>{
    return new Promise<boolean>((resolve)=>{
      this._auth.onAuthStateChanged((user: User | null) =>{
        console.log ('user ->', user);
        if (user){
          resolve(true);
        } else{
          resolve(false);
        }
      });
    });
  }

  private createUserInFirestore(model:UserDto): void{
    const docRef: DocumentReference= doc(this._collection, model.uid);
    setDoc(docRef, {
      name: model.name,
      lastname: model.lastname,
      email: model.email,
      birthday: model.birthday,
      dni: model.dni,
      phone: model.phone
    });

  }

  async login(model: LoginDto): Promise<UserCredential> {
    const isLogged: boolean = await this.getCurrentUser();
    if(isLogged) return Promise.reject('Ya hay un usuario logueado');

    return await signInWithEmailAndPassword(
      this._auth, 
      model.email, 
      model.password
    );
  }

  async logout(): Promise<void>{
    await signOut(this._auth);
  }

  async signUp(model: UserDto): Promise<void>{

    const isLogged: boolean = await this.getCurrentUser();
    if(isLogged) return Promise.reject('Ya hay un usuario logueado');

    await createUserWithEmailAndPassword(
      this._auth, 
      model.email, 
      model.password
    ).then((userCredential: UserCredential) =>{
      model.uid=userCredential.user.uid;
      this.createUserInFirestore(model);
    })
  }


  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this._auth, email);
      console.log('Correo de restablecimiento enviado');
    } catch (error) {
      console.error('Error al enviar el correo de restablecimiento:', error);
      throw error;
    }
  }
}
