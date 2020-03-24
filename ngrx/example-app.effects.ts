import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AppEffects {
  @Effect({ dispatch: false})
  someCheck$ = createEffect(() => this.actions$.pipe(
    ofType('[Any] ACTION1'),
    map(({ prop1 }) => {
      this.router.navigate([url + prop1]);
      return { type: '[Any] Success' };
    })));

  constructor(
    private actions$: Actions,
    private router: Router
  ) {}

}
