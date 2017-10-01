
/*******************************************************************************
 * Type(s) with field level resolvers
*******************************************************************************/

import * as User from './User';

/******************************************************************************/

// import Mutation from '../Mutation.graphql';
import Query from '../Query.graphql';
// import Subscription from '../Subscription.graphql';

import type_Character from './Character.graphql';
import type_User from './User.graphql';
import scalarTypes from './scalar.graphql';

/******************************************************************************/

export const fieldResolvers = {
  User,
};

export * as scalar from './scalar';

/******************************************************************************/

export default [
  // ...Mutation,
  Query,
  // ...Subscription,

  type_Character,
  type_User,

  scalarTypes,
];

