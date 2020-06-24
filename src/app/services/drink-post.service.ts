import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DrinkPostService {
  constructor(private http: HttpClient, private router: Router) {}

  // all posts
  getAllPosts() {
    return this.http.get('/api/drink-posts');
  }

  // Logged in users posts
  getUserPosts() {
    let headers = new HttpHeaders();
    headers = headers.set(
      'authorization',
      localStorage.getItem('topShelf_token')
    );
    return this.http.get('/api/drink-posts/users', { headers });
  }

  postADrink(formValue) {
    // console.log('formValue', formValue);
    let headers = new HttpHeaders();
    headers = headers.set(
      'authorization',
      localStorage.getItem('topShelf_token')
    );

    this.http
      .post('/api/drink-posts/users', formValue, { headers })
      .subscribe((response) => {
        console.log(response);
      });
  }

  deletePost(postId) {
    let headers = new HttpHeaders();
    headers = headers.set(
      'authorization',
      localStorage.getItem('topShelf_token')
    );
    console.log('service', postId);

    return this.http.delete(`api/drink-posts/${postId}`, { headers });
  }
}
