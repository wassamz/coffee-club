import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Person } from '../person.model';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css']
})

export class ListPeopleComponent implements OnInit {
  people: Observable<Person[]>;

  constructor(
    public peopleService: PeopleService) {
  }

  ngOnInit() {
    this.people = this.peopleService.people;
    this.peopleService.loadAll();
    console.log("People to load: " + JSON.stringify(this.people));
  }

  removePerson(person: Person) {
    this.peopleService.removePerson(person);
  }
}
