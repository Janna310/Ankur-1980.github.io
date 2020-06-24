import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferencesRoutingModule } from './preferences-routing.module';
import { PreferencesMainComponent } from './preferences-main/preferences-main.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PreferencesCreateComponent } from './preferences-create/preferences-create.component';
import { PreferencesHomeBarComponent } from './preferences-home-bar/preferences-home-bar.component';
import { PreferencesBartendersComponent } from './preferences-bartenders/preferences-bartenders.component';
import { PreferencesLocationsComponent } from './preferences-locations/preferences-locations.component';
import { PreferencesNavigationComponent } from './preferences-navigation/preferences-navigation.component';
import { PreferencesDrinksComponent } from './preferences-drinks/preferences-drinks.component';
import { RecipeBookModule } from '../recipe-book/recipe-book.module';
import { SavedDrinksComponent } from './saved-drinks/saved-drinks.component';

@NgModule({
  declarations: [
    PreferencesMainComponent,
    PreferencesHomeBarComponent,
    PreferencesCreateComponent,
    PreferencesBartendersComponent,
    PreferencesLocationsComponent,
    PreferencesNavigationComponent,
    PreferencesDrinksComponent,
    SavedDrinksComponent,
  ],
  imports: [
    CommonModule,
    PreferencesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RecipeBookModule,
  ],
})
export class PreferencesModule {}
