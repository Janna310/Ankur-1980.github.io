import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from '../item';
import { PreferencesService } from '../preferences.service';
import { ItemCloud } from '../item_cloud';

@Component({
  selector: 'preferences-locations',
  templateUrl: './preferences-locations.component.html',
  styleUrls: [
    './preferences-locations.component.css',
    '../preferences-pages.css',
  ],
})
export class PreferencesLocationsComponent implements OnInit {
  locations: ItemCloud[] = [];
  itemsSub: Subscription;

  constructor(private preferService: PreferencesService) {}

  ngOnInit(): void {
    this.preferService.getItems();
    this.itemsSub = this.preferService
      .getItemUpdateListener()
      .subscribe((items) => {
        this.locations = items.filter((item) => item.fav_cat === 'places');
      });
  }

  onDelete(itemId) {
    this.preferService.deleteItem(itemId);
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
