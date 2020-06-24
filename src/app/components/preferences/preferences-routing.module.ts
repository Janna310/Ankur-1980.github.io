import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreferencesMainComponent } from './preferences-main/preferences-main.component';

import { AuthGuard } from 'src/app/services/auth-guard.guard';
import { SavedDrinksComponent } from './saved-drinks/saved-drinks.component';

const routes: Routes = [
  {
    path: '',
    component: PreferencesMainComponent,
  },
  {
    path: 'saved-drinks/:id',
    component: SavedDrinksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferencesRoutingModule {}
