import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { CurFriendService } from 'src/app/Services/cur-friend.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  @Output() messageEvent = new EventEmitter<any>();
  head: string = "";
  Chats: string[] = [];
  Text: string = "";

  subscription : Subscription;

  constructor(private friendService: CurFriendService) {
    this.subscription = friendService.subscribeFriend().subscribe((friend) => {
      if(friend) this.head = friend.text;
      else this.head="";
    });
  }

  ngOnInit(): void {
    this.Chats = ['hello'];
  }

  send(): void {
    this.Chats.push(this.Text);
    this.messageEvent.emit(Text);
    this.Text="";
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  } 
}
