import { Component, OnInit } from '@angular/core';
import { RecipeApiService } from 'src/app/services/recipeAPI.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-recipe-details',
  templateUrl: './user-recipe-details.component.html',
  styleUrls: ['./user-recipe-details.component.css'],
})
export class UserRecipeDetailsComponent implements OnInit {
  recipes;
  recipeID: number;

  constructor(
    private recipeApi: RecipeApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipeID = this.route.snapshot.params.recipeID;
    console.log('component', this.recipeID);
  }
}
