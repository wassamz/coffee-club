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
  addPerson(first: string, last: string) {
    console.log('Add Person Component');
    this.peopleService.addPerson(new Person(first, last));
  }

}
