import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class User {
  get uid(): string {
    return this._uid;
  }

  set uid(value: string) {
    this._uid = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get displayName(): string {
    return this._displayName;
  }

  set displayName(value: string) {
    this._displayName = value;
    console.log("SETTER: ", this._displayName)
  }

  private _uid: string = "";
  private _email: string = "";
  private _displayName: string = "";
}
