
import _ from 'lodash';

export films from './Character.films.js';
export homeworld from './Character.homeworld.js';
export species from './Character.species.js';
export vehicles from './Character.vehicles.js';

export const height = c => _.toNumber(c.height);
export const mass = c => _.toNumber(c.mass);
