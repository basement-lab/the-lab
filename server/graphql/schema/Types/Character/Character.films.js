
import rp from 'request-promise';

export default async ({ films }) => films.map(
  async uri => rp({ uri, json: true })
    .then(res => ({
      id: uri.slice(21).split('/')[1],
      ...res,
    }))
    .catch(err => console.log('ERROR: Character.films', err))
);
