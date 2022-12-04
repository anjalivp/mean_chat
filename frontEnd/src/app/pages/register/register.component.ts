import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  message: String ='';
  className = 'd-none';
  isProcess: boolean = false;
 
  constructor(private fb: FormBuilder, private auth: AuthService){
    this.registerForm=this.fb.group({
      username: ['', [Validators.required,  Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   }

  ngOnInit(): void{
 }
 register(){
  this.isProcess=true;
  const data = this.registerForm.value;
  delete data['confirm']
  this.auth.register(data).subscribe(res => {
    if(res.success){
      this.isProcess=false;
      this.message="Account has been created";
      this.className='alert alert-success'
    }else{
      this.isProcess=false;
      this.message=res.message;
      this.className='alert alert-danger'
    }
    // this.registerForm.reset();
  },err => {
      this.isProcess=false;
      this.message="Server Error!";
      this.className='alert alert-danger';
  })
 }

get username(){
   return this.registerForm.get('username') as FormControl;
} 
get email(){
  return this.registerForm.get('email') as FormControl;
} 
get password(){
  return this.registerForm.get('password') as FormControl;
} 

onSubmit(){
  console.log(this.registerForm);
}
 
}
