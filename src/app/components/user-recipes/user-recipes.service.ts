import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserRecipesService {
  constructor(private http: HttpClient) {}

  addNewRecipe(formValue) {
    // console.log(formValue);
    let headers = new HttpHeaders();
    headers = headers.set(
      'authorization',
      localStorage.getItem('topShelf_token')
    );

    this.http
      .post<{ message: string }>('/api/recipes', formValue, { headers })
      .subscribe((response) => {
        console.log(response.message);
      });
  }

  getRecipes() {
    let headers = new HttpHeaders();
    headers = headers.set(
      'authorization',
      localStorage.getItem('topShelf_token')
    );
    return this.http.get('/api/recipes', { headers });
  }
}
