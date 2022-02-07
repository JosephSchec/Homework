import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BlogInfo, BlogInfoServerResponse } from 'src/app/shared/Blog';
import { BlogServiceService } from '../shared/blog-service.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blogs!: Observable<BlogInfo[]>;
  constructor(private blogService: BlogServiceService) { }

  ngOnInit(): void {
    this.blogs=this.blogService.getBlogs();
  }

}
