import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';


@Directive({
  selector: '[compare]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CustomPasswordValidationService, multi: true}]
})
export class CustomPasswordValidationService implements Validator  {
  @Input('compare') controlNameToCompare: string;
  constructor() { 
    this.controlNameToCompare = '';
  }

  validate(c: AbstractControl): ValidationErrors | null {
    const controlToCompare = c.root.get(this.controlNameToCompare);

    if(controlToCompare) {
      const subscription: Subscription = controlToCompare.valueChanges.subscribe(() =>{
        c.updateValueAndValidity();
        subscription.unsubscribe();
      });
    }
    return controlToCompare && controlToCompare.value !== c.value ? {'compare': true} : null;
  }
  

 
}
