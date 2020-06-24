import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemCloud } from '../item_cloud';
import { Subscription } from 'rxjs';
import { PreferencesService } from '../preferences.service';

@Component({
  selector: 'preferences-home-bar',
  templateUrl: './preferences-home-bar.component.html',
  styleUrls: [
    './preferences-home-bar.component.css',
    '../preferences-pages.css',
  ],
})
export class PreferencesHomeBarComponent implements OnInit, OnDestroy {
  homeBar: ItemCloud[] = [];
  itemsSub: Subscription;

  constructor(private preferService: PreferencesService) {}

  ngOnInit(): void {
    this.preferService.getItems();
    this.itemsSub = this.preferService
      .getItemUpdateListener()
      .subscribe((items) => {
        this.homeBar = items.filter((item) => item.fav_cat === 'home_bar');
      });
  }

  onDelete(itemId) {
    this.preferService.deleteItem(itemId);
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
