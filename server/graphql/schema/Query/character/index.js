
import rp from 'request-promise';

export default async (root, { id }) => (
  rp({
    uri: `https://swapi.co/api/people/${id}/`,
    json: true,
  })
    .then(res => ({ id, ...res }))
    .catch(err => console.log('ERROR: Query.character', err))
);
