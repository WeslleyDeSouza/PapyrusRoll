import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { RemoteEntryAuthComponent } from './app/remote-entry/entry.component';

bootstrapApplication(RemoteEntryAuthComponent, appConfig).catch((err) =>
  console.error(err)
);
