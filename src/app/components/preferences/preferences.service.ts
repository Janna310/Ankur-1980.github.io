import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ItemCloud } from './item_cloud';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  items: ItemCloud[] = [];
  itemsUpdated = new Subject<ItemCloud[]>();

  constructor(private http: HttpClient, private auth: AuthService) {}
  // // local
  //   getItems() {
  //     let headers = new HttpHeaders();
  //     headers = headers.set(
  //       'authorization',
  //       localStorage.getItem('topShelf_token')
  //     );

  //     this.http
  //       .get<{ message: string; items: any }>('/api/preferences', { headers })
  //       .subscribe((data) => {
  //         console.log(data.message);
  //         // console.log(data.items);
  //         this.items = data.items;
  //         this.itemsUpdated.next([...this.items]);
  //       });
  //   }

  // AWS
  getItems() {
    // console.log('service working?');

    let headers = new HttpHeaders();
    headers = headers.set(
      'authorization',
      localStorage.getItem('topShelf_token')
    );

    this.http
      .get<{ message: string; items: any }>('/api/favorites', { headers })
      .subscribe((data) => {
        console.log(data.message);
        // console.log(data.items, 'data working');
        this.items = data.items;
        this.itemsUpdated.next([...this.items]);
      });
  }

  getItemUpdateListener() {
    return this.itemsUpdated.asObservable();
  }

  // // local
  // addItems(formValue) {
  //   // console.log('service', formValue);
  //   let headers = new HttpHeaders();
  //   headers = headers.set(
  //     'authorization',
  //     localStorage.getItem('topShelf_token')
  //   );

  //   this.http
  //     .post<{ message: string; items: any }>('/api/preferences', formValue, {
  //       headers,
  //     })
  //     .subscribe((response) => {
  //       console.log(response.message);
  //       // console.log('additems', response.items);
  //       this.itemsUpdated.next(response.items);
  //     });
  // }

  // aws
  addItems(formValue) {
    // console.log('service', formValue);
    let headers = new HttpHeaders();
    headers = headers.set(
      'authorization',
      localStorage.getItem('topShelf_token')
    );

    this.http
      .post<{ message: string; items: any }>('/api/favorites', formValue, {
        headers,
      })
      .subscribe((response) => {
        console.log(response.message);
        // console.log('additems', response.items);
        this.itemsUpdated.next(response.items);
      });
  }

  // local
  // deleteItem(itemId) {
  //   this.http
  //     .delete<{ message: string; items: any }>(`/api/preferences/${itemId}`)
  //     .subscribe(() => {
  //       this.items = this.items.filter((item) => item.preference_id !== itemId);
  //       this.itemsUpdated.next([...this.items]);
  //     });
  // }

  // AWS
  deleteItem(itemId) {
    this.http
      .delete<{ message: string; items: any }>(`/api/favorites/${itemId}`)
      .subscribe(() => {
        this.items = this.items.filter((item) => item.fav_id !== itemId);
        this.itemsUpdated.next([...this.items]);
      });
  }
}
