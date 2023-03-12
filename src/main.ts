import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyY29yb25hMTMiLCJhIjoiY2xlbDFodXFnMDZ2aDN3bWp3aDQwMDgzZCJ9.acvpRtp4CJNVIabIUyC9PA';

if (!navigator.geolocation) {
  const msg = 'Geolocation is not available';
  alert(msg);
  throw new Error(msg);
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
