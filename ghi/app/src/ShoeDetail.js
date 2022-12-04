import React from 'react';
import { Link } from 'react-router-dom';


class ShoeDetail extends React.Component{

    async componentDidMount() {
        const url = 'http://localhost:8080/api/shoes/';

        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            const requests = [];


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
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/shoes/new" className="btn btn-primary btn-lg px-4 gap-3">Add a shoe</Link>
            </div>
          </div>
        </div>
        <div className="container">
          <h2>Shoes</h2>
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
