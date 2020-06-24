import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-saved-drinks',
  templateUrl: './saved-drinks.component.html',
  styleUrls: ['./saved-drinks.component.css'],
})
export class SavedDrinksComponent implements OnInit {
  recipes;
  recipeID: number;
  constructor(
    private route: ActivatedRoute,
    private favService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.recipeID = this.route.snapshot.params.id;
    console.log('component', this.recipeID);

    this.favService.getDetails(this.recipeID).subscribe((data: any) => {
      console.log(data.items);
      this.recipes = data.items;
    });
  }
}
