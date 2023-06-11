import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Inject,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DOCUMENT } from '@angular/common';
declare var $: any;
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
} from '@angular/forms';
import {
  User,
  UserResponse,
  LoginRequest,
  DataResponse,
} from '@app/core/class';
import {
  UserService,
  AuthService,
  SessionStorageService,
  NotificationService,
  ValidationFormsService,
} from '@app/core/services/index';
import {
  SessionConstants,
  MessageConstants,
  AuthRoutesConstants,
} from '@app/core/constants/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  host: { class: 'hold-transition login-page' },
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  // Declaration & initialization
  //host: { class: 'form-v6' },
  loginForm!: FormGroup;
  isLoading = false;
  submitted = false;
  formErrors: any;
  hide: boolean = true;
  error_message: string = '';
  isLoggedIn: boolean = false;
  loggedInUser: UserResponse = new UserResponse();
  formControls!: string[];

  loginModelRequest = new LoginRequest();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef,
    public router: Router,
    private http: HttpClient,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private sessionService: SessionStorageService,
    private notifyService: NotificationService,
    private validationService: ValidationFormsService
  ) {
    
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(
      (response) => (this.isLoggedIn = response)
    );

    this.authService.loggedInUser$.subscribe(
      (response) => (this.loggedInUser = response)
    );
  }

  ngAfterViewInit() {
    // this.loadScripts(['assets/js/adminlte.js']);
  }

  get f() {
    return this.loginForm.controls;
  }

  signIn(): void {
    
    this.submitted = true;
    this.isLoading = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loginModelRequest.UserName = this.loginForm.controls['userName'].value;
    this.loginModelRequest.Password = this.loginForm.controls['password'].value;
    this.userService.login(this.loginModelRequest).subscribe({
      next: (response: DataResponse) => {
        if (response.ResponseCode === 200) {
          
          this.isLoading = false;
          this.isLoggedIn = true;
          this.loggedInUser = response.Result;
          // this.sessionService.set(
          //   SessionConstants.LOGGED_IN_USER,
          //   JSON.stringify(response.Result)
          // );
          // this.sessionService.set(
          //   SessionConstants.IS_LOGGED_IN,
          //   JSON.stringify(this.isLoggedIn)
          // );
          this.sessionService.set(
            SessionConstants.LOGGED_IN_USER,
            JSON.stringify(this.loggedInUser)
          );
          this.sessionService.set(
            SessionConstants.IS_LOGGED_IN,
            JSON.stringify(this.isLoggedIn)
          );

          this.authService.UpdateIsLoggedIn(this.isLoggedIn);
          this.authService.UpdateLoggedInUser(this.loggedInUser);
          // this.router.navigate([AuthRoutesConstants.BUSINESS_HOME_URL]);
          this.router.navigate([AuthRoutesConstants.BUSINESS_HOME_URL]);
        } else {
          this.isLoading = false;
          this.notifyService.showError(
            response.Message,
            MessageConstants.GENERAL_ERROR_TITLE
          );
          return;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.error_message = error.error;
        this.notifyService.showError(
          this.error_message,
          MessageConstants.GENERAL_ERROR_TITLE
        );
        return;
      },
    });
  }

  loadScripts(urls: string[]) {
    for (const url of urls) {
      const script = this.renderer.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      this.renderer.appendChild(document.body, script);
    }
  }

  ngOnDestroy(): void {}
}
