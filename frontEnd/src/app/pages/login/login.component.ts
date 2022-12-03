import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup
  message: String ='';
  className = 'd-none';

  constructor(private fb:FormBuilder, private auth: AuthService, private router: Router){
    this.loginForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['',Validators.required]
    })
  }

  ngOnInit(): void{
  }
  login(){
    const data = this.loginForm.value;
    this.auth.login(data).subscribe((res) => {
      if(res.success){
        localStorage.setItem('token',res.token)
        alert("Login Successful");
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
}
