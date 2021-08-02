import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  
  private _showPassword = false;
  constructor() { }

  public getInputType(): 'text' | 'password' {
    if (this._showPassword) {
        return 'text';
    }
    return 'password';
  }

  public toggleShowPassword(): void {
    this._showPassword = !this._showPassword;
  }

  public get showPassword(): boolean {
      return this._showPassword;
  }
}
