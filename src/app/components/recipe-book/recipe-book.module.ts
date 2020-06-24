import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeBookRoutingModule } from '../recipe-book/recipe-book-routing.module';
import { RecipeMainComponent } from '../recipe-book/recipe-main/recipe-main.component';
import { RecipeFavoritesComponent } from '../recipe-book/recipe-favorites/recipe-favorites.component';
import { RecipeDetailsComponent } from '../recipe-book/recipe-details/recipe-details.component';
import { RecipeCardComponent } from '../recipe-book/recipe-card/recipe-card.component';
import { RecipeSearchComponent } from '../recipe-book/recipe-search/recipe-search.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RecipeMainComponent,
    RecipeFavoritesComponent,
    RecipeDetailsComponent,
    RecipeCardComponent,
    RecipeSearchComponent,
  ],
  imports: [CommonModule, RecipeBookRoutingModule, ReactiveFormsModule],
  exports: [RecipeCardComponent],
})
export class RecipeBookModule {}
