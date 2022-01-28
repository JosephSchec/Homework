import { Component } from '@angular/core';
import { Person } from './person/person.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-hw-app';
  person1: Person = { name: 'Joe', age: 100, address: 'white house' }

  people: Person[] = [
    { name: 'Jeff', age: 42, address: 'main street' },
    { name: 'Bob', age: 30, address: 'first street' },
    { name: 'Will', age: 15, address: ' 2nd street' }
  ]

}
