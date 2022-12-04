import React from'react';
import { Link, useNavigate } from 'react-router-dom'

function HatColumn(props) {
    return (
        <div className="col">
            {props.list.map(hat => {
                let HatDetailUrl = `${hat.id}/`
                return (
                    <Link to={HatDetailUrl} className="text-decoration-none" key={hat.id}>
                        <div className="card mb-3 shadow">
                            <img src={hat.picture_url} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{hat.style}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    {hat.fabric}
                                </h6>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

class HatsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hatColumns: [[], [], []],
        };
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/hats/'

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();

                const requests = [];
                for (let hat of data.hats) {
                    const detailUrl = `http://localhost:8090/api/hats/${hat.id}/`;
                    requests.push(fetch(detailUrl));
                }
                const responses = await Promise.all(requests);
                const hatColumns = [[], [], []];
                let i = 0
                for (const hatResponse of responses) {
                    if (hatResponse.ok) {
                        const details = await hatResponse.json();
                        hatColumns[i].push(details);
                        i = i + 1;
                        if (i > 2) {
                            i = 0
                        }
                    } else {
                        console.error(hatResponse);
                    }
                }

                this.setState({hatColumns: hatColumns})
            }
        } catch(e) {
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
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/hats/new" className="btn btn-primary btn-lg px-4 gap-3">Add a hat</Link>
            </div>
          </div>
        </div>
              <div className="container">
                <h1>Your hats</h1>
                <div className="row">
                    {this.state.hatColumns.map((hatList, index) => {
                        return (
                            <HatColumn key={index} list={hatList} />
                        )
                    })}
                </div>
              </div>
            </>
        )
    }
}

export default HatsList;