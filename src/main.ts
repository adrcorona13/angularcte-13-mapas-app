import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (!navigator.geolocation) {
  const msg = 'Geolocation is not available';
  alert(msg);
  throw new Error(msg);
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
