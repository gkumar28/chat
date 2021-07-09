import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()

export class CurFriendService {

  private service = new Subject<any>();

  constructor() { }

  updateFriend(friend: string) {
    this.service.next({text : friend});
  }

  clearFriend() {
    this.service.next();
  }

  subscribeFriend(): Observable<any> {
    return this.service.asObservable();
  }

}
