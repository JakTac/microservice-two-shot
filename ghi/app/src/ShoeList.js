import React from 'react';
import { Link } from 'react-router-dom';

function ShoeColumn(props) {
  return (
    <div className="col">
      {props.list.map(data => {
        const shoe = data.shoe;
        return (
          <div key={shoe.href} className="card mb-3 shadow">
            <img src={shoe.location.picture_url} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{shoe.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {shoe.location.name}
              </h6>
              <p className="card-text">
                {shoe.description}
              </p>
            </div>
            <div className="card-footer">
              {new Date(shoe.starts).toLocaleDateString()}
              -
              {new Date(shoe.ends).toLocaleDateString()}
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
      shoeColumns: [[], [], []],
    };
  }

  async componentDidMount() {
    const url = 'http://localhost:8000/api/shoes/';

    try {
      const response = await fetch(url);
      if (response.ok) {
        // Get the list of shoes
        const data = await response.json();

        // Create a list of for all the requests and
        // add all of the requests to it
        const requests = [];
        for (let shoe of data.shoes) {
          const detailUrl = `http://localhost:8080${shoe.href}`;
          requests.push(fetch(detailUrl));
        }

        // Wait for all of the requests to finish
        // simultaneously
        const responses = await Promise.all(requests);

        // Set up the "columns" to put the shoe
        // information into
        const shoeColumns = [[], [], []];

        // Loop over the shoe detail responses and add
        // each to to the proper "column" if the response is
        // ok
        let i = 0;
        for (const shoeResponse of responses) {
          if (shoeResponse.ok) {
            const details = await shoeResponse.json();
            shoeColumns[i].push(details);
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
        this.setState({shoeColumns: shoeColumns});
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
          <h1 className="display-5 fw-bold">shoe GO!</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              The only resource you'll ever need to buy fresh new shoes!
            </p>
          </div>
        </div>
        <div className="container">
          <h2>New Releases</h2>
          <div className="row">
            {this.state.shoeColumns.map((shoeList, index) => {
              return (
                <shoeColumn key={index} list={shoeList} />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default MainPage;
