
import rp from 'request-promise';

export default async (root, { id }) => (
  rp({
    uri: `https://swapi.co/api/films/${id}/`,
    json: true,
  })
    .then(res => ({ id, ...res }))
    .catch(err => console.log('ERROR: Query.film', err))
);
