
import {
  ACTION_ONE,
  ACTION_TWO,
} from '../actions';

/******************************************************************************/

export default (state = [], { type, payload }) => {
  switch (type) {
    case ACTION_ONE: {
      return [...state, {
        text: payload.text,
        completed: false,
      }];
    }
    case ACTION_TWO: {
      return [
        ...state.slice(0, payload.index),
        Object.assign({}, state[payload.index], {
          completed: true,
        }),
        ...state.slice(payload.index + 1)
      ];
    }
    default: { return state; }
  }
};
