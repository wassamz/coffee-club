import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { Person } from './Person.model';



@Injectable()
export class PeopleService {
    people: Observable<Person[]>;
    private _people: BehaviorSubject<Person[]>;
    private baseUrl: string;

    private dataStore: {
        people: Person[]
    };

    constructor(private http: Http) {
        this.baseUrl = 'http://localhost:8000';
        this.dataStore = { people: [] };
        this._people = <BehaviorSubject<Person[]>>new BehaviorSubject([]);
        this.people = this._people.asObservable();
    }

    loadAll() {
        this.http.post(`${this.baseUrl}/listMembers`, null).map(response => response.json()).subscribe(data => {
            this.dataStore.people = data;
           /* this.dataStore.people = [
                { _id:0, memberName: 'shawn', memberEmail: 'button@email.com' },
                { _id:1, memberName: 'sam', memberEmail: 'zahreddine@gmail.com' },
                { _id:2, memberName: 'hillary', memberEmail: 'trump@email.com' }
            ]; */
            this._people.next(Object.assign({}, this.dataStore).people);
            console.log("loadAll():: " + JSON.stringify(this.dataStore.people));
        }, error => console.log('Could not load members.'));

        /*this.dataStore.people = [
            { name: 'shawn', email: 'button@email.com' },
            { name: 'sam', email: 'zahreddine@gmail.com' },
            { name: 'hillary', email: 'trump@email.com' }]; */
        this.pushChanges();
    }

    addPerson(person: Person) {
        console.log('People Model> add Person....' + person.memberName);
        /* this.dataStore.people.push(person);
         this.pushChanges();*/
        console.log('People Service> add:' + JSON.stringify(person));
        this.http.post(`${this.baseUrl}/createMember`, {memberName: person.memberName, memberEmail: person.memberEmail}).map(response => response.json()).subscribe(data => {
            this.dataStore.people = data;
            this._people.next(Object.assign({}, this.dataStore).people);
        }, error => console.log('Could not load members.'));
        this.pushChanges();
    }

    updatePerson(person: Person) {
        console.log('People Service> update:' + person.memberName);
        const index = this.dataStore.people.indexOf(person);
        this.dataStore[index] = person;
        this.pushChanges();
    }

    removePerson(person: Person) {
        console.log('People Service> remove:' + person.memberName);
        /*const index = this.dataStore.people.indexOf(person);
        this.dataStore.people.splice(index, 1);*/
        this.http.post(`${this.baseUrl}/removeMember`, {memberEmail: person.memberEmail}).map(response => response.json()).subscribe(data => {
            this.dataStore.people = data;
            this._people.next(Object.assign({}, this.dataStore).people);
        }, error => console.log('Could not load members.' + error));

        this.pushChanges();
    }
    pushChanges() {
        this._people.next(Object.assign({}, this.dataStore).people);
    }
}
