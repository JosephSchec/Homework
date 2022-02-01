import { Component } from '@angular/core';
import { Category } from './Shared/Category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'homework';
  categories: Category[] = [
    { category: "mp3", items: [{ name: 'ipod', price: 99.99 }, { name: "sandisk", price: 75 }] },
    { category: 'headphones', items: [{ name: 'airpods', price: 125 }, { name: "sony", price: 300 }] }
  ]
}

