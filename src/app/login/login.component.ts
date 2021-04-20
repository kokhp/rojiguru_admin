import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private apiService: ApiService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLoginClick() {

    if (this.loginForm.invalid) {
      return;
    }
    const data = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    }

    this.apiService.login(data)
      .subscribe(
        response => {
          if (response) {
            this.toastr.success('Loggedin successfully')
            localStorage.setItem('token', response.data.token);
            this.router.navigate(['/candidates'])
          }
        },
        (error) => {
          this.toastr.error(error.error.errorMessage);
        }
      )
  }

}