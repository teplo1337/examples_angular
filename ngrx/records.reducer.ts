import { AnotherStateInterface } from './index';
import { createReducer, on } from '@ngrx/store';
import { ACTION1, ACTION2 } from './s.action';
import { TypedAction } from '@ngrx/store/src/models';

export const initialState: AnotherStateInterface = {
  prop1: [],
  prop2: null
};

export function someReducer(state: AnotherStateInterface, action: TypedAction<string>) {
  return _someReducer(state, action);
}

// tslint:disable-next-line: variable-name
const _someReducer = createReducer(initialState,
  on(ACTION1, (state, { prop2 }) => {
    return {
      ...state,
      prop2
    };
  }),
  on(ACTION2, (state, { prop1 }) => {
    return {
      ...state,
      prop1
    };
  }),
);
