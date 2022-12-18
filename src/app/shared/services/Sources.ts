import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class Sources {
  private _uid: any;
  private _title: any;
  private _phoneNumber: any;
  private _email: any;
  private _note: any;
  private _personalInfo: any;


  get uid(): any {
    return this._uid;
  }

  set uid(value: any) {
    this._uid = value;
  }

  get title(): any {
    return this._title;
  }

  set title(value: any) {
    this._title = value;
  }

  get phoneNumber(): any {
    return this._phoneNumber;
  }

  set phoneNumber(value: any) {
    this._phoneNumber = value;
  }

  get email(): any {
    return this._email;
  }

  set email(value: any) {
    this._email = value;
  }

  get note(): any {
    return this._note;
  }

  set note(value: any) {
    this._note = value;
  }

  get personalInfo(): any {
    return this._personalInfo;
  }

  set personalInfo(value: any) {
    this._personalInfo = value;
  }
}
