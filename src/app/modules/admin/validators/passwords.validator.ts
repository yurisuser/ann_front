import { AbstractControl } from '@angular/forms';

export function passwordsValidator(password: string, confirm: string) {
  return (c: AbstractControl) => {
    const pass = c.get(password);
    const conf = c.get(confirm);
    if ( pass.value !== conf.value) {
      conf.setErrors({notEquivalent: true});
    }
    return null;
  };
}
