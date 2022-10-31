import {Component, ElementRef, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  name: any;
  personalInfo: any;
  delete(id : string){
    this.store.collection('list').doc(id).delete();
  }
  edit(id : string){
    this.store.collection('userInfo').doc(id).get().subscribe((response) => {
      this.editObj = Object.assign({id : response.id}, response.data());
      this.name = this.editObj.name;
      this.personalInfo = this.editObj.personalInfo;
      this.openDialog();
    })
  }

  @ViewChild('btnShow')
  btnShow!: ElementRef;

  @ViewChild('btnClose')
  btnClose!: ElementRef;

  openDialog(){
    this.btnShow.nativeElement.click();
  }

  closeDialog(){
    this.btnClose.nativeElement.click();
  }
  constructor(private store: AngularFirestore) {}
  editObj : any;
  dataSource : any;
  ngOnInit() {
    this.getAll();
  }
  clearEdit(){
    this.editObj = null;
    this.name = "";
    this.personalInfo = "";
  }
  add(){
    if(this.editObj){
      this.store.collection('userInfo').doc(this.editObj.id).update({name : this.name, personalInfo : this.personalInfo});
    } else {
      this.store.collection('userInfo').add({name : this.name, personalInfo : this.personalInfo});
    }
    this.closeDialog();
  }
  getAll() {
    this.store.collection('userInfo').snapshotChanges().subscribe((response) => {
      this.dataSource = response.map(item =>
        Object.assign({id : item.payload.doc.id}, item.payload.doc.data())
      );
    })
  }
}


