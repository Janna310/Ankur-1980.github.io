import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor(private http: HttpClient) {}

  uploadImage(image: string): any {
    const formData = new FormData();

    // formData.append('image', image);

    // console.log('formData Get', formData.get('image'));
    // console.log('formdata', formData);
    console.log('service image', image);
    return this.http.post('/api/drink-posts/images', 'image being sent');
  }
}
