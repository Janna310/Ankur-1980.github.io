import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'preferences-drinks',
  templateUrl: './preferences-drinks.component.html',
  styleUrls: [
    // './preferences-drinks.component.css',
    '../preferences-pages.css',
  ],
})
export class PreferencesDrinksComponent implements OnInit, OnDestroy {
  favorites = [];
  favSub: Subscription;
  constructor(private favoriteService: FavoritesService) {}

  ngOnInit(): void {
    this.favoriteService.getFavorites();
    this.favSub = this.favoriteService
      .getFavoriteUpdateListener()
      .subscribe((data) => {
        this.favorites = data;
        console.log(this.favorites);
      });
  }

  onDelete(drinkId) {
    this.favoriteService.deleteFromPref(drinkId);
  }

  ngOnDestroy() {
    this.favSub.unsubscribe();
  }
}
