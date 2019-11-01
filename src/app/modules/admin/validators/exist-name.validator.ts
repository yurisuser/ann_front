import { FormControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { UserService } from '../services/user.service';

export const isExistValidator = (field: string, srv: UserService): AsyncValidatorFn => {
    return (ctrl: FormControl): Observable<ValidationErrors | null> => {
        return timer(1000).pipe(
            switchMap(() => {
                return srv.verifyExist({[field]: ctrl.value}).pipe(
                        map(x => x ?  {isExist: true} : null));
            })
        );
    };
};
