import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlacesService } from '../../services';
import {Map, Popup, Marker} from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('map') 
  mapElement!: ElementRef

  constructor(private placesService: PlacesService) { }

  ngAfterViewInit(): void {
    if (!this.placesService.useLocation) {
      throw Error('Cannot get user location');
    }
    const map = new Map({
      container: this.mapElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.useLocation, // starting position [lng, lat]
      zoom: 17, // starting zoom
      });
    const popup = new Popup()
      .setHTML(`
        <h6>Aquí estoy</h6>
        <span>Estoy en este lugar del mundo</span>
      `);
    new Marker({
      color: 'red'
    })
      .setLngLat(this.placesService.useLocation)
      .setPopup(popup)
      .addTo(map)
  }
}
