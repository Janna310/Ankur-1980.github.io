import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRecipesMainComponent } from './user-recipes-main/user-recipes-main.component';
import { UserRecipesCreateComponent } from './user-recipes-create/user-recipes-create.component';

const routes: Routes = [
  {
    path: '',
    component: UserRecipesMainComponent,
  },
  {
    path: 'user-recipe-form',
    component: UserRecipesCreateComponent,
  },
  {
    path: 'saved-drinks/:recipeID',
    component: UserRecipesCreateComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRecipesRoutingModule {}
