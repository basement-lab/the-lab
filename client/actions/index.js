
export const ACTION_ONE = 'ACTION_ONE';
export const ACTION_TWO = 'ACTION_TWO';

export function actionOne(payload) {
  return { type: ACTION_ONE, payload };
}

export function actionTwo(payload) {
  return { type: ACTION_TWO, payload };
}
