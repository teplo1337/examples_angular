import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { RouterStateUrl } from './custom.serializer';
import { routerReducer } from '@ngrx/router-store';
import { SomeClass } from '../models/example.model';

export interface AnotherStateInterface {
  prop1?: SomeClass;
  prop2?: number;
}

export interface AppStateInterface {
  anotherState?: AnotherStateInterface;
  router?: { state: RouterStateUrl };
}

export const reducers: ActionReducerMap<any> = {
  anotherState: AnotherStateReducer,
  router: routerReducer
};


export const metaReducers: MetaReducer<AppStateInterface>[] = !environment.production ? [] : [];
