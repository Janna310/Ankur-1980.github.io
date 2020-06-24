import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { RecipeApiService } from 'src/app/services/recipeAPI.service';
import { UserRecipesService } from 'src/app/components/user-recipes/user-recipes.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'user-recipes-create',
  templateUrl: './user-recipes-create.component.html',
  styleUrls: ['./user-recipes-create.component.css'],
})
export class UserRecipesCreateComponent implements OnInit {
  userRecipe: FormGroup;
  glassware;
  latitude;
  longitude;
  ratingDisplay;

  constructor(
    private fb: FormBuilder,
    private recipeAPI: RecipeApiService,
    private favService: FavoritesService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.recipeAPI.getGlassware().subscribe((data) => {
      this.glassware = data['drinks'];
    });

    this.userRecipe = this.fb.group({
      name: ['', [Validators.required]],
      glassware: [''],
      method: [''],
      ingredient1: [''],
      ingredient2: [''],
      ingredient3: [''],
      ingredient4: [''],
      ingredient5: [''],
      ingredient6: [''],
      ingredient7: [''],
      ingredient8: [''],
      amount1: [''],
      amount2: [''],
      amount3: [''],
      amount4: [''],
      amount5: [''],
      amount6: [''],
      amount7: [''],
      amount8: [''],
      user_id: [this.auth.userID],
      // date: this.fb.control(new Date()),
    });

    this.userRecipe.valueChanges.subscribe((value) => {
      this.ratingDisplay = value.rating;
    });
  }

  // removeIngredient(i) {
  //   let ingredientsArray = this.userRecipe.controls.ingredients as FormArray;
  //   ingredientsArray.removeAt(i);
  // }

  // addIngredient() {
  //   let ingredientsArray = this.userRecipe.controls.ingredients as FormArray;
  //   let arrayLen = ingredientsArray.length;

  //   let newIngredientGroup: FormGroup = this.fb.group({
  //     amount: [''],
  //     ingredient: [''],
  //   });

  //   ingredientsArray.insert(arrayLen, newIngredientGroup);
  // }

  onSubmit() {
    // console.log(this.userRecipe.value);

    this.favService.userRecipes(this.userRecipe.value);
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
  }
}
