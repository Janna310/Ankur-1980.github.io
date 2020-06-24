import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ApiError } from 'src/app/interfaces/api-error';

@Component({
  selector: 'new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.css'],
})
export class NewUserFormComponent implements OnInit {
  newUserForm: FormGroup;
  registered: boolean = false;
  errors: ApiError[] = [];

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    public nav: NavbarService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nav.hide();
    this.newUserForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        userName: ['', [Validators.required]],
        age: ['', [Validators.required, Validators.min(21), Validators.min(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        password2: ['', [Validators.required, ,]],
        bio: ['', [Validators.maxLength(255)]],
        date: this.fb.control(new Date()),
      },
      {
        validator: this.usersService.PasswordValidation(
          'password',
          'password2'
        ),
      }
    );
  }

  get firstName() {
    return this.newUserForm.get('firstName');
  }
  get lastName() {
    return this.newUserForm.get('lastName');
  }
  get userName() {
    return this.newUserForm.get('userName');
  }
  get age() {
    return this.newUserForm.get('age');
  }
  get email() {
    return this.newUserForm.get('firstName');
  }
  get password() {
    return this.newUserForm.get('password');
  }
  get password2() {
    return this.newUserForm.get('password2');
  }

  validateDOB(dob) {
    let year = new Date(dob.target.value).getFullYear();
    let today = new Date().getFullYear();
    if (today - year >= 21) {
      console.log(`you can drink`);
    } else {
      console.log(`you are not old enough`);
    }
  }

  // // this doesn't work :()
  // get newUserFormControl() {
  //   return this.newUserForm.controls;
  // }

  register() {
    if (this.newUserForm.invalid) {
      return;
    }
    // empty errors array on submit
    this.errors = [];
    this.auth.register(this.newUserForm.value).subscribe(
      (data) => {
        this.router.navigate(['/login'], {
          queryParams: { message: 'You have been successfully registered!' },
        });
      },
      (errors: ApiError[]) => {
        this.errors = errors;
        console.log(this.errors);
      }
    );
  }
}
