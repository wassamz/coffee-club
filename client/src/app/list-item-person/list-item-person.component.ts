import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../person.model';

@Component({
  selector: 'app-list-item-person',
  templateUrl: './list-item-person.component.html',
  styleUrls: ['./list-item-person.component.css']
})
export class ListItemPersonComponent implements OnInit {
  @Input('person') person: Person;
  @Output() removePersonEmit = new EventEmitter();
  @Output() updatePersonEmit = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log('list-item: ' + this.person.memberName);
  }

  updateSelectedPerson(): void {
    console.log('update selected person:' + this.person.memberName);
    this.updatePersonEmit.next(this.person);
  }

  removeSelectedPerson(): void {
    console.log('remove selected person: ' + this.person.memberName);
    this.removePersonEmit.next(this.person);
  }
}
