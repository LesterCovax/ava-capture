//
// Copyright (c) 2018 Electronic Arts Inc. All Rights Reserved 
//

import {Component, ViewEncapsulation} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

import { CaptureService } from '../capture/capture.service';
import { CoreComponent } from '../core/core.component';

import { LoadDataEveryMs } from '../../utils/reloader';

@Component({
  selector: 'capture_select',
  template: `
    <div class="section_select">
        <div>
          <div class="title">Live Capture</div>
          <div *ngIf="!loading">
            <span class="label">Location:</span>
            <select [(ngModel)]="selected_location" (ngModelChange)="onChangeCaptureLocation($event)">
              <option value="0">Please select a location</option>
              <option *ngFor="let loc of locations; trackBy:trackById" value="{{loc.id}}">
                <i *ngIf="!loc.access" class="fa fa-lock"></i>
                {{loc.name}}
                <span *ngIf="loc.active">({{loc.active}})</span>
              </option>
            </select>            
          </div>
        </div>
    </div>

    <section class="content">
      <router-outlet></router-outlet>
    </section>
  `,
  encapsulation: ViewEncapsulation.None,
  providers: [CaptureService]
})
export class CapturePageSelect {

  selected_location = 0;
  locations = [];
  loading : boolean = true;

  loader = new LoadDataEveryMs();

  constructor (private router: Router, private captureService: CaptureService, private coreComponent: CoreComponent) {
    this.router = router;

    router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
            // Notification each time the route changes, so that we can change the select dropdown
            if (val.urlAfterRedirects.startsWith('/app/capture/live-capture/')) {
              this.selected_location = Number(val.urlAfterRedirects.split('/')[4]);
              this.coreComponent.setCurrentLocation(this.selected_location);
            }
        }
    });

  }

  trackById(obj : any) {
    return obj.id;
  }

  onChangeCaptureLocation(event) {
    if (this.selected_location > 0) {
      this.router.navigate(['app', 'capture', 'live-capture', this.selected_location]);
    }
  }

  ngOnInit() {

      this.loader.start(5000, () => { return this.captureService.getSystemInformation(); }, data => {
          this.locations = data.locations;
          this.loading = false;
          
          if (this.coreComponent.getCurrentLocation()>0 && this.selected_location != this.coreComponent.getCurrentLocation()) {
            this.router.navigate(['app', 'capture', 'live-capture', this.coreComponent.getCurrentLocation()]);
          }
        }, 
        err => {
          this.loading = false;
        }, 
        'getSystemInformation'); // cache key
  }

  ngOnDestroy() {
    this.loader.release();
  }

}
