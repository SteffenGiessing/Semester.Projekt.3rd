import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from './shared/services/User';
import {Sources} from './shared/services/Sources';
import {Observable, Subject} from 'rxjs';
import {combineLatest} from 'rxjs';
import {Routes} from "@angular/router";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// const appRoutes: Routes =  [
//   {path: 'sign-in', component:  SignInComponent},
//   {path: 'sign-up', component: SignUpComponent}
// ]
export class AppComponent implements OnInit {
  constructor(private store: AngularFirestore, public user: User, public sources: Sources) {
  }
  searchTerm: any;
  jsonObject: Object | undefined;
  arrayOfChange: any = [];
  uid: any;
  title: any;
  phoneNumber: any;
  email: any;
  note: any;
  name: any;
  personalInfo: any;
  startAt = new Subject();
  endAt = new Subject();
  startObs = this.startAt.asObservable();
  endObs = this.endAt.asObservable();

  delete(id: string) {
    this.store.collection('list').doc(id).delete();
  }

  @ViewChild('EditbtnShow')
  EditbtnShow!: ElementRef;

  @ViewChild('btnClose')
  btnClose!: ElementRef;


  openDialog() {
    this.EditbtnShow.nativeElement.click();
  }

  closeDialog() {
    this.btnClose.nativeElement.click();
  }

  editObj: any;
  dataSource: any;

  foundSources: any;
  showTitle: any;

  ngOnInit() {
    this.getAll();
    combineLatest(this.startObs, this.endObs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((foundSource: any) => {
        this.foundSources = foundSource;
      })
    })
  }

  firequery(start: any, end: any) {
    return this.store.collection('userInfo', ref =>
      ref.limit(5000).orderBy('title').startAt(start).endAt(end)).valueChanges();
  }

  search($event: any) {
    let searchVal = $event.target.value;
    this.startAt.next(searchVal);
    //SearchVal + whatever follows that (Pattern Matching)
    this.endAt.next(searchVal + "\uf8ff")

  }

  clearEdit() {
    this.editObj = null;
    this.name = "";
    this.personalInfo = "";
  }

  add() {
    this.store.collection('userInfo').add({
      title: this.title,
      phoneNumber: this.phoneNumber,
      email: this.email,
      note: this.note,
      personalInfo: this.user.email
    }).then(result =>

      console.log("Added: ", this.user.email)
    );
    this.closeDialog();
  }

  getAll() {
    this.store.collection('userInfo').snapshotChanges().subscribe((response) => {
      this.dataSource = response.map(item =>
        Object.assign({id: item.payload.doc.id}, item.payload.doc.data())
      );
    })
  }

  getOneSource(id: string, title: string, phoneNumber: string, email: string, note: string, personalinfo: string) {
    this.sources.title = title
    this.sources.phoneNumber = phoneNumber
    this.sources.email = email
    this.sources.note = note
    this.uid = id
    this.title = title
    this.phoneNumber = phoneNumber
    this.email = email
    this.note = note;
    this.openDialog()
  }

  edit(id: string, title: string, phoneNumber: string, email: string, note: string, personalinfo: string) {
    console.log(this.sources.title, " NÆSTE TITLE ", title)
    if (this.sources.title != title) {
      this.jsonObject = {title: title}
      console.log("happening")
    }
    this.jsonObject = <JSON>this.arrayOfChange;

    this.store.collection('userInfo').doc(id).update({
        title: title,
        phoneNumber: phoneNumber,
        email: email,
        note: note
      }
    ).then(r => console.log("User have been updated"));
    this.store.collection('sourcesHistory').add({
      title: this.title,
      phoneNumber: this.phoneNumber,
      email: this.email,
      note: this.note,
      personalInfo: this.user.email,
      uid: this.user.uid,
      docUid: id
    }).then(result =>
      console.log("Added: ", this.user.email)
    );
    this.closeDialog();
  }
  flushUser(){

  }
}


