import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, } from '@angular/router';

import { CurFriendService } from 'src/app/Services/cur-friend.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [CurFriendService]
})
export class DashboardComponent implements OnInit {
  
  id : any = "";

  constructor(private activeroute : ActivatedRoute,
              private route : Router,
              private friendService : CurFriendService) { }

  ngOnInit(): void {
    this.activeroute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    })
  }

}
