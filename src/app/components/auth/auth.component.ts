import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    private loginForm;
    public isDisabledButton = false;
    public errMessage = '';

    constructor(
        private authSrv: AuthService,
        private formBuilder: FormBuilder,
    ) {
        this.loginForm = this.formBuilder.group({
            login: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    ngOnInit() {
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.isDisabledButton = true;
            this.errMessage = '';
            this.authSrv.sendLoginPassword(this.loginForm.value)
              .subscribe(() => {
                this.isDisabledButton = false;
                },
                err => {
                  if (err.status === 401 || err.status === 404) {
                    this.errMessage = 'Wrong login or password';
                  } else {
                    this.errMessage = 'Unknown error';
                  }
                  this.isDisabledButton = false;
                }
              );
          }
    }

}
