import {Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../shared/services/User";
import {Sources} from "../shared/services/Sources";
import {combineLatest, Subject} from "rxjs";
import {LocalStorage} from "../shared/services/localStorage";


@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  constructor(private localStorage: LocalStorage, private store: AngularFirestore, public user: User, public sources: Sources) {
    this.displayName = localStorage.getData('displayName')
    console.log("Frontpage: ", this.displayName)
  }

  displayName: any;
  searchTerm: any;
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
  deleteEmail: any;

  @ViewChild('deletebtn')
  deletebtnShow!: ElementRef;

  @ViewChild('deletebtnClose')
  deletebtnClose!: ElementRef;

  @ViewChild('EditbtnShow')
  EditbtnShow!: ElementRef;

  @ViewChild('btnClose')
  btnClose!: ElementRef;

  @ViewChild('AddbtnShow')
  AddbtnShow!: ElementRef;

  @ViewChild('addbtnClose')
  addbtnClose!: ElementRef;

  openDeleteDialog(email: string) {
    this.deleteEmail = email
    this.deletebtnShow.nativeElement.click()
  }

  closeDeleteDialog() {
    this.deletebtnClose.nativeElement.click()
  }


  openAddDialog() {
    this.AddbtnShow.nativeElement.click();
  }

  closeAddDialog() {
    this.addbtnClose.nativeElement.click();
  }

  openEditDialog() {
    this.EditbtnShow.nativeElement.click();
  }

  closeEditDialog() {
    this.btnClose.nativeElement.click();
  }

  dataSource: any;
  foundSources: any;

  ngOnInit() {
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

  delete(it: any) {
    this.store.collection('userInfo').doc(it.id).delete().then(r => console.log("Sources Deleted:", r));
    this.closeDeleteDialog();
  }

  add(title: string, phoneNumer: string, email: string, note: string) {
    this.store.collection('userInfo').add({
      title: title,
      phoneNumber: phoneNumer,
      email: email,
      note: note,
      sourceCreator: localStorage.getItem('displayName'),
      sourceCreatorUid: localStorage.getItem('uid'),
      sourceCreatorEmail: localStorage.getItem('email')
    }).then(result =>
      console.log("Added: ", this.user.email)
    );
    this.closeAddDialog();
  }

  findElementToDelete() {
    var keepGoing = true;
    console.log("EMAIL", this.deleteEmail)
    this.store.collection('userInfo').snapshotChanges().subscribe((response) => {
      this.dataSource = response.map(item =>
        Object.assign({id: item.payload.doc.id}, item.payload.doc.data())
      );
      this.dataSource.forEach((it: any) => {
        console.log(it.email)
        if (keepGoing) {
          if (it.email == this.deleteEmail) {
            console.log("hitting")
              this.delete(it)
              keepGoing = false;
              console.log(it.uid)
            }
          }
      })
    })
  }

  checkIt(it: any) {
    console.log("CheckIT: ", it)
    this.edit(it.id)
  }

  getOneSource(title: string, phoneNumber: string, email: string, note: string, personalinfo: string) {
    this.title = title
    this.phoneNumber = phoneNumber
    this.email = email
    this.note = note;
    this.openEditDialog()
  }

  findElementToEdit(email: any) {
    var keepGoing = true;
    this.store.collection('userInfo').snapshotChanges().subscribe((response) => {
      this.dataSource = response.map(item =>
        Object.assign({id: item.payload.doc.id}, item.payload.doc.data())
      );
      this.dataSource.forEach((it: any) => {
        if (keepGoing) {
          if (this.email == email) {
            console.log("Hallo", it)
            this.checkIt(it)
            keepGoing = false
          }
        }
      })
    })
  }

  edit(id: string) {
    console.log(id, this.title, this.phoneNumber, this.email, this.note)
    this.store.collection('userInfo').doc(id).update({
        title: this.title,
        phoneNumber: this.phoneNumber,
        email: this.email,
        note: this.note
      }
    ).then((response) => {
      console.log("User have been updated", response)
    })
    this.store.collection('sourcesHistory').add({
      title: this.title,
      phoneNumber: this.phoneNumber,
      email: this.email,
      note: this.note,
      userEmail: localStorage.getItem('email'),
      uid: localStorage.getItem('uid'),
      docUid: id
    }).then(result =>
      console.log("Added: ", this.user.email)
    );
    this.closeEditDialog();
  }
}
