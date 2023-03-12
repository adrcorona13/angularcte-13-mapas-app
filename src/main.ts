import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { env } from './environments/environment';

mapboxgl.accessToken = env.apiKey;

if (!navigator.geolocation) {
  const msg = 'Geolocation is not available';
  alert(msg);
  throw new Error(msg);
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
