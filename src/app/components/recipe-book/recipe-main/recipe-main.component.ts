import { Component, OnInit } from '@angular/core';
import { RecipeApiService } from 'src/app/services/recipeAPI.service';

@Component({
  selector: 'recipe-main',
  templateUrl: './recipe-main.component.html',
  styleUrls: ['./recipe-main.component.css'],
})
export class RecipeMainComponent implements OnInit {
  recipes: any[];

  constructor(private recipeApi: RecipeApiService) {}

  ngOnInit(): void {
    this.recipeApi.getRandom().subscribe((data) => {
      this.recipes = data['drinks'];
      // console.log(this.recipes);
    });
  }

  nameSearch(results) {
    // console.log(results);
    this.recipes = results;
  }
}
