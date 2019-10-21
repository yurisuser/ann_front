import { FormControl } from '@angular/forms';

export function ExistUserValidator(arr: string[]) {
    return (ctrl: FormControl) => {
        if ( arr.includes(ctrl.value)) {
            return  {isExist: true};
        }
        return null;
    };
}
