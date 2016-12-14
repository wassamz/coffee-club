/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListItemPersonComponent } from './list-item-person.component';
import { ListPeopleComponent } from '../list-people/list-people.component';

import { Person } from '../person.model';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('ListItemPersonComponent', () => {
  let component: ListItemPersonComponent;
  let fixture: ComponentFixture<ListItemPersonComponent>;
  let app: ComponentFixture<ListItemPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListItemPersonComponent
      ]
      , imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemPersonComponent);
    component = fixture.componentInstance;
    component.person = new Person('Sam', 'Zahreddine');
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render title in a div tag', async(() => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#name').textContent).toContain('Sam');
  }));

  it('should have a button named Remove', async(() => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button.ui.button').textContent).toContain('Remove');
  }));

  it('should emit to Remove the person Sam Zahreddine', async(() => {
    let compiled = fixture.debugElement.nativeElement;
    let button = compiled.querySelector('button');
    spyOn(component.removePersonEmit, 'next');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.removePersonEmit.next).toHaveBeenCalledWith(component.person);
  }));
});
