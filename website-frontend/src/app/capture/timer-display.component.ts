//
// Copyright (c) 2018 Electronic Arts Inc. All Rights Reserved 
//


import { Component } from '@angular/core';

import { interval } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'timer-display',
  template: `{{displayvalue}}`
})
export class TimerDisplayComponent {

    public displayvalue: string;

    starttime = null;
    subscription = null;

    TimeStr(ms) {
        var zeropad = function(n) {
            return ('00' + n.toString()).slice(-2);
        };
        var d = new Date(ms);
        return d.getUTCHours().toString() + ':' + zeropad(d.getUTCMinutes()) + ':' + zeropad(d.getUTCSeconds());
    }

    start() {
      if (this.subscription)
        this.subscription.unsubscribe();
      this.starttime = Date.now();
      this.subscription = interval(250).pipe(startWith(0))
            .subscribe(() => this.displayvalue = this.TimeStr(Date.now() - this.starttime));
    }

    pause() {
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = null;
      }
    }

    clear() {
      this.pause();
      this.displayvalue = '';
    }

    ngOnInit() {
    }

    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = null;
      }
    }
}
