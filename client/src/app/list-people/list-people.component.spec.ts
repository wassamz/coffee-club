/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListPeopleComponent } from './list-people.component';
import { ListItemPersonComponent } from '../list-item-person/list-item-person.component';
import { PeopleService } from '../people.service';
import { Person } from '../person.model';

describe('ListPeopleComponent', () => {
  let component: ListPeopleComponent;
  let fixture: ComponentFixture<ListPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListPeopleComponent,
        ListItemPersonComponent
      ],
      providers: [PeopleService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ListPeopleComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should remove a Person', () => {
    let testPerson = new Person('John', 'Cena');

    component.peopleService.addPerson(testPerson);
    spyOn(component.peopleService, 'removePerson');
    component.removePerson(testPerson);
    fixture.detectChanges();
    expect(component.peopleService.removePerson).toHaveBeenCalledWith(testPerson);
  });
});
