import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        this.isNotNumber,
        this.isNotLowerCase,
        this.isNotUpperCase,
        this.isNotSpecialCharacter,
      ]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[6-9][0-9]{9}$'),
      ]),
    });
  }

  isNotUpperCase(password: FormControl) {
    if (password.value != null && !/[A-Z]+/.test(password.value)) {
      return { hasUpperCase: true };
    }
    return null;
  }

  isNotLowerCase(password: FormControl) {
    if (password.value != null && !/[a-z]+/.test(password.value)) {
      return { hasLowerCase: true };
    }
    return null;
  }

  isNotNumber(password: FormControl) {
    if (password.value != null && !/[0-9]+/.test(password.value)) {
      return { hasNumber: true };
    }
    return null;
  }

  isNotSpecialCharacter(password: FormControl) {
    if (password.value != null && !/\W|_/g.test(password.value)) {
      return { hasSpecialCase: true };
    }
    return null;
  }

  formSubmit() {
    this.userService.addUser(this.userForm.value).subscribe(
      (res) => {
        Swal.fire({
          title: 'Success',
          text: 'You have successfully registered!',
          icon: 'success',
          confirmButtonText: "Let's Go",
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      (err) => {
        console.log(err);

        let message = '';

        if (err.statusText == 'Unknown Error') {
          message = 'Internal Server Error. Try Again Later!';
        } else if (err?.error?.errorMessage?.includes('User')) {
          message = err.error.errorMessage + '. Try different Username!';
        }

        this._snackBar.open(message, 'Dismiss', { duration: 3000 });
      }
    );
  }
}
