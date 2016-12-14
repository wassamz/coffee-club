import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Person } from './Person.model';



@Injectable()
export class PeopleService {
    people: Observable<Person[]>;
    private _people: BehaviorSubject<Person[]>;

    private dataStore: {
        people: Person[]
    };

    constructor() {
        this.dataStore = { people: [] };
        this._people = <BehaviorSubject<Person[]>>new BehaviorSubject([]);
        this.people = this._people.asObservable();
    }

    loadAll() {
        this.dataStore.people = [
            { firstname: 'shawn', lastname: 'button' },
            { firstname: 'sam', lastname: 'zahreddine' },
            { firstname: 'hillary', lastname: 'trump' }];
        this.pushChanges();
    }

    addPerson(person: Person) {
        console.log('People Model> add Person....' + person.firstname);
        this.dataStore.people.push(person);
        this.pushChanges();
    }

    updatePerson(person: Person) {
        console.log('People Service> update:' + person.firstname);
        const index = this.dataStore.people.indexOf(person);
        this.dataStore[index] = person;
        this.pushChanges();
    }

    removePerson(person: Person) {
        console.log('People Service> remove:' + person.firstname);
        const index = this.dataStore.people.indexOf(person);
        this.dataStore.people.splice(index, 1);
        this.pushChanges();
    }
    pushChanges() {
        this._people.next(Object.assign({}, this.dataStore).people);
    }
}
