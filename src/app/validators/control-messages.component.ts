import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from './validation.service';

@Component({
  selector: 'control-messages',
  template: `<mat-error *ngIf="errorMessage !== null">{{errorMessage}}</mat-error> `
})
export class ControlMessagesComponent 
{
  @Input() control: FormControl;

  constructor() { }

  get errorMessage() 
  {
    for (let propertyName in this.control.errors) 
    {
      // if (this.control.errors.hasOwnProperty(propertyName) && (this.control.dirty || this.control.touched) ) 
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.invalid && (this.control.dirty || this.control.touched) ) 
      {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}