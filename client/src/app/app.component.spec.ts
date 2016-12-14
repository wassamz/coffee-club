/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent} from './app.component';
import { ListPeopleComponent } from './list-people/list-people.component';
import { ListItemPersonComponent } from './list-item-person/list-item-person.component';
import { AddPersonComponent } from './add-person/add-person.component';

import { PeopleService } from './people.service';

describe('App: CoffeeClub2', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent, ListItemPersonComponent, AddPersonComponent, ListPeopleComponent
      ],
      providers: [PeopleService]
    });
  });

  it('should create the AppComponent', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'AppComponent works!'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});
