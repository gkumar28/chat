import { TestBed } from '@angular/core/testing';

import { CurFriendService } from './cur-friend.service';

describe('CurFriendService', () => {
  let service: CurFriendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurFriendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
