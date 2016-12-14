import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent} from './app.component';
import { ListItemPersonComponent } from './list-item-person/list-item-person.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { ListPeopleComponent } from './list-people/list-people.component';
import { PeopleService } from './people.service';

@NgModule({
  declarations: [
    AppComponent, ListItemPersonComponent, AddPersonComponent, ListPeopleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
