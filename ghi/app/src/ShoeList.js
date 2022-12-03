import React from 'react';
import { Link } from 'react-router-dom';

function ShoeColumn(props) {
    let z = JSON.stringify(props)
  return (
    <div className="col">
      {props.list.map(shoe => {
        return (
          <div key={shoe.model} className="card mb-3 shadow">
            <img src={shoe.picture_url} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{shoe.model}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {shoe.manufacturer}
              </h6>
              <p className="card-text">
                {shoe.bin.id}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Ss: [[], [], []],
    };
  }

  async componentDidMount() {
    const url = 'http://localhost:8080/api/shoes/';

    try {
      const response = await fetch(url);
      if (response.ok) {
        // Get the list of shoes
        const data = await response.json();
        // Create a list of for all the requests and
        // add all of the requests to it
        const requests = [];
        for (let shoe of data.shoes) {
          const detailUrl = `http://localhost:8080/api/shoe/${shoe.id}`;
          let x = fetch(detailUrl)
          requests.push(x);
        }

        // Wait for all of the requests to finish
        // simultaneously
        const responses = await Promise.all(requests);

        // Set up the "columns" to put the shoe
        // information into
        const Ss = [[], [], []];

        // Loop over the shoe detail responses and add
        // each to to the proper "column" if the response is
        // ok
        let i = 0;
        for (const shoeResponse of responses) {
          if (shoeResponse.ok) {
            const details = await shoeResponse.json();
            const stringified = JSON.stringify(details)
            Ss[i].push(details);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(shoeResponse);
          }
        }
        // Set the state to the new list of three lists of
        // shoes
        this.setState({Ss: Ss});
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <>
        <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
          <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
          <h1 className="display-5 fw-bold">Wardrobify</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              The only resource you'll ever need to organize your clothing!
            </p>
          </div>
        </div>
        <div className="container">
          <h2>New Releases</h2>
          <div className="row">
            {this.state.Ss.map((shoeList, index) => {
              return (
                <ShoeColumn key={index} list={shoeList} />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default MainPage;
