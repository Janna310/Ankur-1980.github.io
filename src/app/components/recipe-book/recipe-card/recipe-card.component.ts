import { Component, OnInit, Input } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe;
  show = true;
  constructor(public favoriteService: FavoritesService) {}

  ngOnInit(): void {}

  toggleAddRemove() {
    if (this.show) {
      this.favoriteService.addToFavorites(this.recipe);
      this.show = !this.show;
    } else {
      this.favoriteService.removeFromFavorites(this.recipe);
      this.show = !this.show;
    }

    //   if (this.favoriteService.containsFavorite(this.recipe)) {
    //     this.favoriteService.removeFromFavorites(this.recipe);
    //   } else {
    //     this.favoriteService.addToFavorites(this.recipe);
    //   }
  }
}
