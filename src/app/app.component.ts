import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from '@angular/router'
import {User} from './shared/services/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private store: AngularFirestore, private router: Router, public user: User) {
  }

  uid: any;
  title: any;
  phoneNumber: any;
  email: any;
  note: any;
  name: any;
  personalInfo: any;

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

  ngOnInit() {
    this.getAll();
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
    this.uid = id
    this.title = title
    this.phoneNumber = phoneNumber
    this.email = email
    this.note = note;
    this.openDialog()
  }

  edit(id: string, title: string, phoneNumber: string, email: string, note: string, personalinfo: string) {

    this.store.collection('userInfo').doc(id).update({
      title: title,
      phoneNumber: phoneNumber,
      email: email,
      note: note
    }).then(r => console.log("User have been updated"));
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
}


