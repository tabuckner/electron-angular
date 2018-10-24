import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public max = 1;
  public current = 0;

  start() {
    const interval$ = interval(100)
      .pipe(
        takeWhile(_ => !this.isFinished),
        tap(i => this.current += 0.1)
      );
    // Unsubcribe later on.
    interval$.subscribe();
  }

  finish() {
    this.current = this.max;
  }

  reset() {
    this.current = 0;
  }

  // Ensures Max value is never less than 0.1;
  get maxVal() {
    return isNaN(this.max) || this.max < 0.1 ? 0.1 : this.max;
  }

  // Ensures current value is never less than zero.
  get currentVal() {
    return isNaN(this.current) || this.current < 0 ? 0 : this.current;
  }

  // Returns truthy if current value is above or equal to max value.
  get isFinished() {
    return this.currentVal >= this.maxVal;
  }
}
