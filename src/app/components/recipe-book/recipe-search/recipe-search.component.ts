import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipeApiService } from '../../../services/recipeAPI.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ALPHABET } from './alphabet';

@Component({
  selector: 'recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css'],
})
export class RecipeSearchComponent implements OnInit {
  glassware: any;
  alcoholic: any;
  categories: any;
  alphabet: string[] = ALPHABET;
  filterForm: FormGroup;
  nameSearch: FormGroup;
  letterSearch: FormGroup;
  @Output() searchResults = new EventEmitter();

  constructor(private fb: FormBuilder, private recipeAPI: RecipeApiService) {}

  ngOnInit(): void {
    // this.recipeAPI.getGlassware().subscribe((data) => {
    //   this.glassware = data['drinks'];
    // });
    // this.recipeAPI.getAlcoholic().subscribe((data) => {
    //   this.alcoholic = data['drinks'];
    // });
    // this.recipeAPI.getCategories().subscribe((data) => {
    //   this.categories = data['drinks'];
    // });

    // this.recipeAPI.filterCocktailType().subscribe((data) => {
    //   console.log('filter cocktails', data['drinks']);
    // });

    this.nameSearch = this.fb.group({
      searchName: [''],
    });

    this.letterSearch = this.fb.group({
      letter: [''],
    });
  }

  searchByName() {
    this.recipeAPI
      .searchByName(this.nameSearch.value)
      .subscribe((data) => this.searchResults.emit(data['drinks']));
  }

  searchByLetter() {
    this.recipeAPI.searchByLetter(this.letterSearch.value).subscribe((data) => {
      this.searchResults.emit(data['drinks']);
    });
  }

  resetForm() {
    this.filterForm.reset();
  }
}
