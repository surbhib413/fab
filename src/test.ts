// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
//const context = require.context('./', true, /\.spec\.ts$/);
//const context = require.context('./', true, /app.component\.spec\.ts$/);
//const context = require.context('./', true, /login.component\.spec\.ts$/);
//const context = require.context('./', true, /lc-form.component\.spec\.ts$/);
//const context = require.context('./', true, /attachment.component\.spec\.ts$/);
//const context = require.context('./', true, /header.component\.spec\.ts$/);
//const context = require.context('./', true, /general.component\.spec\.ts$/);
const context = require.context('./', true, /landing.component\.spec\.ts$/);
//const context = require.context('./', true, /login-content.component\.spec\.ts$/);
//const context = require.context('./', true, /authentication.service\.spec\.ts$/);
//const context = require.context('./', true, /side-bar.component\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
