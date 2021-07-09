import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id: any;
  options: string[] = ['Profile','Settings','Logout'];

  constructor(private route: Router, private appRoute: ActivatedRoute) { 
    this,appRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }

  chooseOption(op: string) {
    if(op == 'Logout') this.route.navigateByUrl('/');
  }

  ngOnInit(): void {
    //console.log(this.id);
  }

}
