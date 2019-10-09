import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    private loginForm;

    constructor(
        private authSrv: AuthService,
        private formBuilder: FormBuilder,
    ) {
        this.loginForm = this.formBuilder.group({
            name: 'user3',
            password: 'user3'
        });
    }

    ngOnInit() {
    }

    submit(data) {
        this.authSrv.sendLoginPassword(data).subscribe(
            x => console.log(x)
        );
    }

}
