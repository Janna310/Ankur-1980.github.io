import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeApiService } from '../../../services/recipeAPI.service';

@Component({
  selector: 'recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipes;
  recipeID: number;

  constructor(
    private recipeAPI: RecipeApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipeID = this.route.snapshot.params.recipeID;
    console.log('component', this.recipeID);

    this.recipeAPI.getDetails(this.recipeID).subscribe((data) => {
      this.recipes = data['drinks'];
      console.log('details', this.recipes);
    });
  }
}
