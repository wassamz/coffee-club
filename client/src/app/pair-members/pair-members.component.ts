import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PeopleService } from '../people.service';
import { MemberPair } from '../MemberPair.model';

@Component({
  selector: 'app-pair-members',
  templateUrl: './pair-members.component.html',
  styleUrls: ['./pair-members.component.css']
})
export class PairMembersComponent implements OnInit {
  pairings: Observable<MemberPair[]>;

  constructor(public peopleService: PeopleService) { }

  ngOnInit() {
    this.pairings = this.peopleService.pairings;
    this.peopleService.pairMembers();
  }

  pairMembers() {
    this.peopleService.pairMembers();
  }

  emailMembers() {
    this.peopleService.emailMembers();
  }
}
