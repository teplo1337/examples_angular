import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = route;
    // returning the object based on the RouterStateUrl interface
    return { url, params, queryParams };
  }
}

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}
