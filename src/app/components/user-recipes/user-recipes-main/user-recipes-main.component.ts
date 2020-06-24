import { Component, OnInit } from '@angular/core';
import { UserRecipesService } from 'src/app/components/user-recipes/user-recipes.service';
import { MOCK_RECIPES } from 'src/app/MOCK_DATA/mock-recipes';

@Component({
  selector: 'user-recipes-main',
  templateUrl: './user-recipes-main.component.html',
  styleUrls: ['./user-recipes-main.component.css'],
})
export class UserRecipesMainComponent implements OnInit {
  recipes;
  mockRecipes = MOCK_RECIPES;

  constructor(private userRecipeService: UserRecipesService) {}

  ngOnInit(): void {
    this.userRecipeService.getRecipes().subscribe((data) => {
      this.recipes = data;
      console.log(this.recipes);
    });
  }
}
