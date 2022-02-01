import { Component, Input } from '@angular/core';
import { Category } from '../Shared/Category';
import { Item } from '../Shared/Item';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  @Input() categories?: Category[];
  @Input() categoryChose?: String;
  items?: Item[];
  changeSelect() {
    const category= this.categories?.find(el=>el.category===this.categoryChose)
    this.items=category?.items;
  }
}


