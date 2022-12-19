import { Component } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from '../shared/services/User';
import {user} from "@angular/fire/auth";
import {Router} from "@angular/router";
import { collection, query, where, getFirestore } from "firebase/firestore";
import {getDocs} from "@angular/fire/firestore";
import {LocalStorage} from "../shared/services/localStorage";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent {
  constructor(private router: Router,
              private localStorage: LocalStorage,
              private authenticationService: AuthenticationService,
              public afs: AngularFirestore,
              public afAuth: AngularFireAuth,
              public userToStore: User,
              private store: AngularFirestore) {}
  userDbRef = getFirestore()

  ref = query(collection(this.userDbRef, 'usersPersonalInformation'));

  // var querySnapShot = getDocs(this.ref)
  SignIn(email:string, password:string){
    return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
    //  this.SetUserData(result.user)
      this.afAuth.authState.subscribe(async (user) => {
        if (user) {
          this.localStorage.clearData()
           var querySnapShot = await getDocs(this.ref)
          querySnapShot.forEach((doc) => {
            this.localStorage.saveData('email', email)
            this.localStorage.saveData('uid', doc.get('uid'))
            this.localStorage.saveData('displayName', doc.get('displayname'))
          })
          await this.router.navigate(['/front-page'])
        }
      });
    }).catch((error) =>{
      window.alert("Wrong Login")
    })
  }
  SetUserData(activeUser: any) {
    this.userToStore.email = activeUser.get.email
    this.userToStore.uid = activeUser.get.uid
    this.userToStore.displayName = activeUser.get.displayName
    console.log(activeUser.get.email,
      activeUser.uid, activeUser.email, activeUser.displayName)
    console.log(this.userToStore.email)
    this.localStorage.saveData('displayName', this.userToStore.email)
    // this.localstorage.setItem('activeUser', JSON.stringify(this.userToStore))
    // let auth;
    // auth = this.localstorage.getItem('activeUser')
    // console.log("AUTH:", auth)
  }
  // addUser(uid: string | undefined, displayname: string | null | undefined){
  //   this.store.collection('usersPersonalInformation').add({displayname : displayname, uid : uid});
  // }
}
