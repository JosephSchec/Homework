import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import Posts from './Posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<Posts[]> {
    return this.httpClient.get<Posts[]>('https://jsonplaceholder.typicode.com/posts?id=1')
      .pipe(map(posts => {
        return posts.map(p => {
          return {
            title: p.title,
            body: p.body
          }
        })
      })
      );
  }
}



