import { Component, Input, OnInit } from '@angular/core';
import { BlogInfo } from 'src/app/shared/Blog';

@Component({
  selector: 'app-blog-info',
  templateUrl: './blog-info.component.html',
  styleUrls: ['./blog-info.component.css']
})
export class BlogInfoComponent  {
@Input() blogInfo !:BlogInfo;


}
