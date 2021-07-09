import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  Chats: string[] = [];
  Text: string = "";

  constructor() { }

  ngOnInit(): void {
    this.Chats = ['hello'];
  }

  send(): void {
    this.Chats.push(this.Text);
    this.Text="";
  }
 
}
