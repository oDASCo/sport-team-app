import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted = false;
  public showMsg = false;

  constructor(private router: Router,
              private fb: FormBuilder) {
  }


  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
    this.submitted = true;
    const {email, password} = this.loginForm.value;
    if (email === 'test@test.ru' && password === '12345678') {
      this.router.navigate(['/main/empty']);
    } else {
      this.showMsg = true;
    }
  }

}
