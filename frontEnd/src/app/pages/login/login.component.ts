import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  message: String ='';
  className = 'd-none';

  constructor(private fb:FormBuilder, private auth: AuthService, private router: Router){
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void{
  }
  login(){
    const data = this.loginForm.value;
    this.auth.login(data).subscribe((res) => {
      if(res.success){
        localStorage.setItem('token',res.token);
        this.router.navigate(['dashboard'])
      }else{
        this.message=res.message;
        this.className='alert alert-danger'
      }
    },err =>{
        this.message="Login Failed!";
        this.className='alert alert-danger'
    })
  }

 
 get email(){
   return this.loginForm.get('email') as FormControl;
 } 
 get password(){
   return this.loginForm.get('password') as FormControl;
 } 
 
 onSubmit(){
   console.log(this.loginForm);
 }

}
