import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LocationAPIService {
  constructor(private http: HttpClient) {}



  // googleLocation() {

  // }
  // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.latitude},${this.longitude}&key=AIzaSyBhOU1Ihjofs0XFDQA5rlMA1Fvs4Y3Mz3E
}
