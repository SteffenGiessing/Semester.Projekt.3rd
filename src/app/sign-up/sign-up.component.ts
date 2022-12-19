import { Component } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { User } from '../shared/services/User';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from '@angular/router'
import {user} from "@angular/fire/auth";
@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.css']
})
export class SignUpComponent {
  constructor(private router: Router,
              private store: AngularFirestore,
              public authenticationService: AuthenticationService,
              public afAuth: AngularFireAuth) {
  }


  SignUp(email: string, password: string, displayName: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user, displayName)
        window.alert('You have been successfully registered!');
        this.addUser(result.user?.uid, displayName)
        console.log(result.user);
        this.router.navigate(['/front-page'])
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  SetUserData(user: any, displayname: string) {
    const userData: { uid: any; displayName: string; email: any } = {
      uid: user.uid,
      email: user.email,
      displayName: displayname,
    };
    console.log(userData.uid, userData.email, userData.displayName)
  }

  addUser(uid: string | undefined, displayname: string | null | undefined){
    this.store.collection('usersPersonalInformation').add({displayname : displayname, uid : uid});
  }
}
