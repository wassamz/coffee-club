/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddPersonComponent } from './add-person.component';
import { Person } from '../person.model';
import { PeopleService } from '../people.service';


describe('AddPersonComponent', () => {
  let component: AddPersonComponent;
  let fixture: ComponentFixture<AddPersonComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ AddPersonComponent ]
      ,
      providers: [PeopleService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a button named Add', async(() => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button.ui.button').textContent).toContain('Add');
  }));

  it('should call PeopleService to add Shawn Button', async(() => {
    let compiled = fixture.debugElement.nativeElement;
    let button = compiled.querySelector('button');

    let firstNameField = compiled.querySelector('input[id=firstNameField]');
    let lastNameField = compiled.querySelector('input[id=lastNameField]');
    let person = new Person('Shawn', 'Button');

    firstNameField.value = person.firstname;
    lastNameField.value = person.lastname;

    firstNameField.dispatchEvent(new Event('input'));
    lastNameField.dispatchEvent(new Event('input'));

    spyOn(component.peopleService, 'addPerson');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.peopleService.addPerson).toHaveBeenCalledWith(person);

  }));

});
