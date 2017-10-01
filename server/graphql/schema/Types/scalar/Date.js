
import { Kind } from 'graphql/language';

export default {
  __parseValue(value) { // value from the client
    // return new Date(value);
    return value;
  },
  __serialize(value) { // value sent to the client
    if (typeof value === 'object'
      && typeof value.getTime === 'function') {
      return value.getTime();
    }
    return value;
  },
  __parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return (parseInt(ast.value, 10)); // ast value is always in string format
    }
    return null;
  },
};
