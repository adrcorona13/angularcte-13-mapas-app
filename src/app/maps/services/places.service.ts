import { Injectable } from '@angular/core';
import { PlacesResponse, Feature } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api';


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
    private httpClient: PlacesApiClient
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

    if (!this.useLocation) {
      throw Error('There is no location available.')
    }

    this.httpClient.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.useLocation.join(',')
      }
    })
      .subscribe( resp => {
        console.log(this.places);
        
        this.isLoadingPlaces = false;
        this.places = resp.features;
      }) 
  }
}
