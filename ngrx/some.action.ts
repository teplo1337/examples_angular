import { createAction, props } from '@ngrx/store';
import { SomeClass } from '../models/example.model';

export const ACTION1 = createAction('[Any] ACTION1',
  props<{ prop1: SomeClass[]}>());
export const ACTION2 = createAction('[Any] ACTION2',
  props<{ prop2: number}>());
