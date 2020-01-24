import { FormControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, timer, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { IUserData } from '../models/userData';

export const isExistValidator = (field: string, srv: UserService, editUser?: IUserData): AsyncValidatorFn => {
    return (ctrl: FormControl): Observable<ValidationErrors | null> => {
        if (editUser && editUser[field] == ctrl.value) {
            // console.log(editUser[field], ctrl.value);
            return of(null);
        }
        return timer(1000).pipe(
            switchMap(() => {
                return srv.verifyExist({[field]: ctrl.value}).pipe(
                        map(x => x ?  {isExist: true} : null));
            })
        );
    };
};
