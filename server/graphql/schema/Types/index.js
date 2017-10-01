
// import rp from 'request-promise';

/******************************************************************************/

import * as Character from './Character';
import * as Film from './Film';
// import * as Planet from './Planet';
import * as Species from './Species';
import * as Starship from './Starship';
import * as User from './User';
import * as Vehicle from './Vehicle';

/******************************************************************************/

// import Mutation from '../Mutation.graphql';
import Query from '../Query.graphql';
// import Subscription from '../Subscription.graphql';

import type_Character from './Character.graphql';
import type_Film from './Film.graphql';
import type_Planet from './Planet.graphql';
import type_Species from './Species.graphql';
import type_Starship from './Starship.graphql';
import type_User from './User.graphql';
import type_Vehicle from './Vehicle.graphql';
import scalarTypes from './scalar.graphql';


/*******************************************************************************
 * Type(s) with field level resolvers
*******************************************************************************/

export const fieldResolvers = {
  Character,
  Film,
  // Planet,
  Species,
  Starship,
  User,
  Vehicle,
};

export * as scalar from './scalar';


/*******************************************************************************
 * GraphQL Type Definitions
*******************************************************************************/

export default [
  // ...Mutation,
  Query,
  // ...Subscription,

  type_Character,
  type_Film,
  type_Planet,
  type_Species,
  type_Starship,
  type_User,
  type_Vehicle,

  scalarTypes,
];

