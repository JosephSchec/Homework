import { Component, Input } from '@angular/core';

export interface Person {
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {
  @Input() person: Person = { name: '', age: 0, address: '' }
}
