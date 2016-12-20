import { Component, OnInit } from '@angular/core';

import { Person } from '../person.model';
import { PeopleService } from '../people.service';


@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  constructor(
     public peopleService: PeopleService) {
  }

  ngOnInit() {
  }
  addPerson(memberName: string, memberEmail: string) {
    console.log('Add Person Component');
    this.peopleService.addPerson(new Person(0,memberName, memberEmail,0));
  }

}
