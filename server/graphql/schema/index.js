
import {
  // addMockFunctionsToSchema,
  addResolveFunctionsToSchema,
  makeExecutableSchema,
} from 'graphql-tools';

import * as Query from './Query';
// import * as Mutation from './Mutation';
// import * as Subscription from './Subscription';

import typeDefs, { fieldResolvers, scalar } from './Types';

/******************************************************************************/

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query,
    // Mutation,
    // Subscription,
    ...scalar,
  },
});

addResolveFunctionsToSchema(schema, fieldResolvers);

/******************************************************************************/

// addMockFunctionsToSchema({ schema });

/******************************************************************************/

// export default schema;

