class NetworkGateway {
  constructor() {
    this.endpointURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
    this.id = '';
  }

  getID = async (key) => {
    await fetch(`${this.endpointURL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: key }),
    })
      .then((response) => response.json())
      .then((data) => {
        const stringResult = data.result;
        this.id = stringResult.substring(13, 34);
      })
      .catch((error) => {
        throw error;
      });
  }

  insertData = async (_name, _score) => {
    const data = await fetch(`${this.endpointURL}/${this.id}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: _name, score: _score }),
    });
    return data.json();
  }

  fetchData = async () => {
    const data = await fetch(`${this.endpointURL}/${this.id}/scores`);
    return data.json();
  }
}

export default NetworkGateway;