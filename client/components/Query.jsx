
import React, { PureComponent } from 'react';

export default class Query extends PureComponent {
  state = {
    data: [],
    error: null,
  };

  componentDidMount() {
    fetch('/api/status').then(console.log);

    fetch('/api/test')
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .catch(error => this.setState({ error }));
  }

  render() {
    return (
      <div>
        {!!this.state.data.length && this.state.data.map(({ id, name }) => (
          <div key={id}>
            <span>{name}</span>
          </div>
        ))}
        {!!this.state.error &&
          <pre>
            {JSON.stringify(this.state.error, null, 2)}
          </pre>
        }
      </div>
    );
  }
}
