import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../preferences.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CATEGORIES } from '../categories';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'preferences-create',
  templateUrl: './preferences-create.component.html',
  styleUrls: ['./preferences-create.component.css'],
})
export class PreferencesCreateComponent implements OnInit {
  categories = CATEGORIES;
  itemForm: FormGroup;
  tokenId: string;

  constructor(
    private preferService: PreferencesService,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      info: [''],
      category: [''],
      user_id: [this.auth.userID],
    });
  }

  onSubmit() {
    // console.log('component', this.itemForm.value);
    this.preferService.addItems(this.itemForm.value);
    this.itemForm.reset();
  }

  // getUserId() {
  //   this.itemForm = this.auth.userID;
  // }
}
