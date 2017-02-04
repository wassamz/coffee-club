import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { Person } from './Person.model';
import { MemberPair } from './MemberPair.model';


@Injectable()
export class PeopleService {
    people: Observable<Person[]>;
    pairings: Observable<MemberPair[]>;

    private _people: BehaviorSubject<Person[]>;
    private _pairings: BehaviorSubject<MemberPair[]>;
    private baseUrl: string;

    private dataStore: {
        people: Person[],
        pairings: MemberPair[]
    };

    constructor(private http: Http) {
        this.baseUrl = 'http://localhost:8000';
        this.dataStore = { people: [], pairings: [] };
        
        this._people = <BehaviorSubject<Person[]>>new BehaviorSubject([]);
        this.people = this._people.asObservable();
        
        this._pairings = <BehaviorSubject<MemberPair[]>>new BehaviorSubject([]);
        this.pairings = this._pairings.asObservable();

    }

    loadAll() {
        this.http.post(`${this.baseUrl}/listMembers`, null).map(response => response.json()).subscribe(data => {
            this.dataStore.people = data;
            this._people.next(Object.assign({}, this.dataStore).people);
            console.log('loadAll():: ' + JSON.stringify(this.dataStore.people));
        }, error => console.log('Could not load members.'));
        this.pushChanges();
    }

    addPerson(person: Person) {
        console.log('People Model> add Person....' + person.memberName);

        console.log('People Service> add:' + JSON.stringify(person));
        this.http.post(`${this.baseUrl}/createMember`, {
            memberName: person.memberName,
            memberEmail: person.memberEmail
        }).map(response => response.json()).subscribe(data => {
            this.dataStore.people = data;
            this._people.next(Object.assign({}, this.dataStore).people);
        }, error => console.log('Could not load members.'));
        this.pairMembers();
        this.pushChanges();
    }

    updatePerson(person: Person) {
        console.log('People Service> update:' + person.memberName);

        this.http.post(`${this.baseUrl}/updateMember`, {
            id: person._id,
            newMemberName: person.memberName,
            newMemberEmail: person.memberEmail
        }).map(response => response.json()).subscribe(data => {
            this.dataStore.people = data;
            this._people.next(Object.assign({}, this.dataStore).people);
        }, error => console.log('Could not load members.'));
        this.pairMembers();
        this.pushChanges();
    }

    removePerson(person: Person) {
        console.log('People Service> remove:' + person.memberName);

        this.http.post(`${this.baseUrl}/removeMember`, {
            memberEmail: person.memberEmail
        }).map(response => response.json()).subscribe(data => {
            this.dataStore.people = data;
            this._people.next(Object.assign({}, this.dataStore).people);
        }, error => console.log('Could not load members.' + error));
        this.pairMembers();
        this.pushChanges();
    }

    pairMembers() {
        this.http.post(`${this.baseUrl}/pairMembers`, null).map(response => response.json()).subscribe(data => {
            this.dataStore.pairings = data;
            this._pairings.next(Object.assign({}, this.dataStore).pairings);
            console.log('pairings():: ' + data);
        }, error => console.log('Could not load members.'));
        this.pushChanges();
    }
   
    emailMembers() {
        this.http.post(`${this.baseUrl}/emailMembers`, null).map(response => response.json()).subscribe(data => {
            console.log('emailMembers():: ' + data);
        }, error => console.log('Could not load members.'));
    }

    pushChanges() {
        this._people.next(Object.assign({}, this.dataStore).people);
        this._pairings.next(Object.assign({}, this.dataStore).pairings);
    }
}
