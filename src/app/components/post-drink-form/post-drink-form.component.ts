import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecipeApiService } from 'src/app/services/recipeAPI.service';
import { DrinkPostService } from 'src/app/services/drink-post.service';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

export class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'post-drink-form',
  templateUrl: './post-drink-form.component.html',
  styleUrls: ['./post-drink-form.component.css'],
})
export class PostDrinkFormComponent implements OnInit {
  drinkPostForm: FormGroup;
  glassware: string;

  constructor(
    private fb: FormBuilder,
    private recipeApi: RecipeApiService,
    private drinkPostService: DrinkPostService,
    private auth: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.recipeApi.getGlassware().subscribe((data) => {
      this.glassware = data['drinks'];
    });

    this.drinkPostForm = this.fb.group({
      name: ['', [Validators.required]],
      rating: [0],
      glassware: [''],
      description: [''],
      location: [''],
      imageLocation: [null],
      dateAdded: [moment().format()],
      username: [this.auth.username],
    });
  }

  onSubmit() {
    // console.log(this.drinkPostForm.value);
    this.drinkPostService.postADrink(this.drinkPostForm.value);
    this.route.navigate(['/the-feed']);
  }
}
