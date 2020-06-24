import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  visible: boolean;

  constructor(private http: HttpClient) {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  getUserPic() {
    let headers = new HttpHeaders();
    headers = headers.set(
      'authorization',
      localStorage.getItem('topShelf_token')
    );
    return this.http.get('/api/users/pic', { headers });
  }
}
