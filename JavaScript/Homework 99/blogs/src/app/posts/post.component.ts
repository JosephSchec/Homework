import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Posts from '../shared/Posts';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class BlogComponent implements OnInit {
  constructor(private postService:PostsService) { }

  posts!:Observable<Posts[]>;
  ngOnInit(): void {
    this.posts=this.postService.getPosts();
  }

}
