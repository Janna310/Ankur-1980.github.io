import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeApiService } from '../../../services/recipeAPI.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css','../quiz.component.css'],
})
export class ResultsComponent implements OnInit {
  recipes: any[];

  constructor(private recipeApi: RecipeApiService) {}

  ngOnInit(): void {
    this.recipeApi.getRandom().subscribe((data) => {
      this.recipes = data['drinks'];
    });
  }

  nameSearch(results) {
    this.recipes = results;
  }
}
