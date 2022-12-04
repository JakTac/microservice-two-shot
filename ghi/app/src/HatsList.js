import React from'react';

function HatColumn(props) {
    return (
        <div className="col">
            {props.list.map(hat => {
                console.log(hat)
                return (
                    <div key={hat.id} className="card mb-3 shadow">
                        <img src={hat.picture_url} className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{hat.style}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {hat.color}
                            </h6>
                            <p className="card-text">
                                {hat.fabric}
                            </p>
                        </div>
                        <div className="card-footer">
                            {hat.location.closet_name}
                        </div>
                    </div>
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
                    const detailUrl = `http://localhost:8090/api/hat/${hat.id}/`;
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