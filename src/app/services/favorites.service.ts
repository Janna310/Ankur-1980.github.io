import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favorites: any[] = [];
  favoritesUpdated = new Subject<any[]>();

  constructor(private http: HttpClient, private router: Router) {}

  addToFavorites(drink) {
    let headers = new HttpHeaders();
    headers = headers.set(
      'authorization',
      localStorage.getItem('topShelf_token')
    );

    this.http
      .post<{ message: string; items: any }>('/api/recipes', drink, { headers })
      .subscribe((response) => {
        console.log(response.message);
        this.favorites.push(drink);

        this.favoritesUpdated.next([...this.favorites]);
        // console.log('service', this.favorites);
      });
  }

  userRecipes(recipe) {
    console.log('service', recipe);
    let headers = new HttpHeaders();
    headers = headers.set(
      'authorization',
      localStorage.getItem('topShelf_token')
    );

    this.http
      .post<{ message: string; items: any }>('/api/recipes/created', recipe, {
        headers,
      })
      .subscribe((response) => {
        console.log(response.message);
        this.favorites.push(recipe);

        this.favoritesUpdated.next([...this.favorites]);
        this.router.navigate(['/preferences']);
        // console.log('service', this.favorites);
      });
  }

  getFavorites() {
    let headers = new HttpHeaders();
    headers = headers.set(
      'authorization',
      localStorage.getItem('topShelf_token')
    );

    this.http
      .get<{ message: string; items: any }>('/api/recipes', { headers })
      .subscribe((response) => {
        console.log(response.message);
        this.favorites = response.items;
        this.favoritesUpdated.next([...this.favorites]);
      });
  }

  getFavoriteUpdateListener() {
    return this.favoritesUpdated.asObservable();
  }

  removeFromFavorites(drink) {
    // console.log('service', drinkId);
    const parsedId = drink.idDrink;
    this.http
      .delete<{ message: string; items: any }>(`/api/recipes/${parsedId}`)
      .subscribe((response) => {
        console.log(response.message);
        this.favorites = this.favorites.filter(
          (fav) => fav.id_drink !== parsedId
        );
        this.favoritesUpdated.next([...this.favorites]);
      });
  }

  deleteFromPref(drinkId) {
    // console.log('drinkID', drinkId);
    this.http
      .delete<{ message: string; items: any }>(`/api/recipes/${drinkId}`)
      .subscribe((response) => {
        console.log(response.message);

        this.favorites = this.favorites.filter(
          (fav) => fav.saved_id !== drinkId
        );
        this.favoritesUpdated.next([...this.favorites]);
      });
  }

  containsFavorite(drink) {
    return this.favorites.includes(drink);
  }

  savedRecipeDetails(recipeID) {
    console.log(recipeID);

    return this.http.get(`/api/recipes/${recipeID}`);
  }

  getDetails(recipeID) {
    let headers = new HttpHeaders();
    headers = headers.set(
      'authorization',
      localStorage.getItem('topShelf_token')
    );
    // console.log('service', recipeID);
    return this.http.get(`/api/recipes/${recipeID}`, { headers });
  }
}
