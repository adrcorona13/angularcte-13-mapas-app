import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlacesResponse, Feature } from '../interfaces/places.interface';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation: [number, number] | undefined;
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];
  
  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor(
    private httpClient: HttpClient
  ) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        (err) => {
          alert('Cannot get Geolocation');
          console.log(err);
          reject(); 
        }
      )
    });
  }

  getPlacesByQuery(query: string = ''){
    this.isLoadingPlaces = true;
    this.httpClient.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=ip&access_token=pk.eyJ1IjoiYWRyY29yb25hMTMiLCJhIjoiY2xlbDFodXFnMDZ2aDN3bWp3aDQwMDgzZCJ9.acvpRtp4CJNVIabIUyC9PA`)
      .subscribe( resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;
      }) 
  }
}
