import { Component, OnInit, Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() submit = new EventEmitter(); 

  states: string[] = ['Login','Signup'];
  InputFields: string[] = [];
  InputVals: string[] = [];
  ind: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.ind = 0;
    this.InputFields = ['Username','Password'];
  }

  ChangeConnection() {
    if(this.ind == 0) this.InputFields.push('Email');
    else this.InputFields.pop();
    this.ind ^= 1;
  }

  CurrentState() {
    let arr: string[] = ['New to Name','Already have an Account'];
    return arr[this.ind];
  }

  Submit() {
    console.log(this.InputVals);
  }

  // Simple Arithmetic
  xor(num: number) {
    let res: number = num ^ 1;
    return res;
  }
}
