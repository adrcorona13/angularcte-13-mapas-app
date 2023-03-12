import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places.interface';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../interfaces/directions.interfaces';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: Map | undefined;
  private markers: Marker[] = [];

  get isMapReady() {
    return !!this.map;
  }

  setMap(map: Map){
    this.map = map;
  }

  constructor(
    private directionsApi: DirectionsApiClient
  ) { }

  flyTo(coords: LngLatLike){
    if (!this.isMapReady) {
      throw Error('El mapa no esta inicializado');
    }
    this.map?.flyTo({
      zoom: 14,
      center: coords
    })
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]){
    if (!this.map) throw Error('El mapa no esta inicializado');
    
    this.markers.forEach(marker => marker.remove());
    const newMarkers = [];
    for(const place of places){
      const [lat, lng] = place.center;
      const popup = new Popup()
        .setHTML(`
          <h6>${place.text}</h6>
          <span>${place.place_name}</span>
        `)
      const newMarker = new Marker()
        .setLngLat([lat,lng])  
        .setPopup(popup)
        .addTo(this.map);  
      newMarkers.push(newMarker);
    }

    this.markers = newMarkers;

    if (places.length === 0) return;

    const bounds = new LngLatBounds();

    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));

    bounds.extend(userLocation);

    this.map.fitBounds(bounds, {
      padding: 200
    });
  }

  getRouteBetweenTwoPoints(start: [number, number], end: [number, number]){
    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe(resp => {
        console.log(resp);
        this.drawPolyline(resp.routes[0]);
      });
  }

  private drawPolyline(route: Route){
    console.log({distance: route.distance / 1000, duration: route.duration / 60});

    if (!this.map) throw Error('Mapa no inicializado');

    const coords = route.geometry.coordinates;
       
    const bounds = new LngLatBounds();
    coords.forEach( ([lng, lat]) => {
      bounds.extend([lng, lat])
    })

    this.map!.fitBounds(bounds, {
      padding: 200
    });
    
  }
  

}
