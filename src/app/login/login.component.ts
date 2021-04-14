import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLoginClick() {

    if (this.loginForm.invalid) {
      console.log("form is invalid")
      return;
    }
    console.log(this.loginForm.controls);
    const data = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    }

    console.log(data);

    this.apiService.login(data)
      .subscribe(
        response => {
          if (response) {
            console.log("Success!", response);
            localStorage.setItem('token', response.data.token);
            this.router.navigate(['/employee'])
            console.log(response.data.token)
          }
        },
        (error) => console.log("Failed", error.statusText)
      )
  }

}