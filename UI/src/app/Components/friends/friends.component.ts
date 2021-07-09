import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { CurFriendService } from 'src/app/Services/cur-friend.service';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends:string[] = ['asd','asdasd'];

  constructor(private friendservice: CurFriendService) { 
  }

  ngOnInit(): void {
  }

  chooseFriend(str: string) {
    this.friendservice.updateFriend(str);
  }

}
