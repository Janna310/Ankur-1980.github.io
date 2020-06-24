import { Component, OnInit } from '@angular/core';
import { PreferencesService } from 'src/app/components/preferences/preferences.service';

@Component({
  selector: 'preferences-main',
  templateUrl: './preferences-main.component.html',
  styleUrls: ['./preferences-main.component.css'],
})
export class PreferencesMainComponent implements OnInit {
  displayOthers = null;

  constructor() {}

  ngOnInit(): void {}

  displayFavorite(value) {
    this.displayOthers = value;
  }
}
