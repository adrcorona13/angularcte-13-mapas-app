import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlacesService } from '../../services';
import {Map} from 'mapbox-gl';

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
  }
}
