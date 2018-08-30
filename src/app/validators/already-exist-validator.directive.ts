import { Directive } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidatorFn } from '@angular/forms';
import { Observable } from "rxjs";
import { MasterService } from '../Services/master.service';
import { map } from "rxjs/operators";

export function AlreadyExistValidator(master: MasterService): AsyncValidatorFn 
{
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return master.cityNameCheck(c.value).pipe(
      map(cityCheck => {
        return cityCheck === false ? null : { 'alreadyExist': true }
      })
    );
  }
}

@Directive({
  selector: '[alreadyExist]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: AlreadyExistValidatorDirective, multi: true }]
})

export class AlreadyExistValidatorDirective implements AsyncValidator 
{
  constructor(private master: MasterService) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> 
  {
    return AlreadyExistValidator(this.master)(c);
  }
}
