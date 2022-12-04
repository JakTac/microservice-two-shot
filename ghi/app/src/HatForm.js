import React from 'react'

class HatForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fabric: '',
            style: '',
            color: '',
            pictureUrl: '',
            locations: [],
        };
        this.handleFabricChange = this.handleFabricChange.bind(this)
        this.handleStyleChange = this.handleStyleChange.bind(this)
        this.handleColorChange = this.handleColorChange.bind(this)
        this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleFabricChange(event) {
        const value = event.target.value
        this.setState({ fabric: value })
    }

    handleStyleChange(event) {
        const value = event.target.value
        this.setState({ style: value })
    }

    handleColorChange(event) {
        const value = event.target.value
        this.setState({ color: value })
    }

    handlePictureUrlChange(event) {
        const value = event.target.value
        this.setState({ pictureUrl: value })
    }
    
    handleLocationChange(event) {
        const value = event.target.value
        this.setState({ location: value })
    }

    async handleSubmit(event) {
        event.preventDefault()
        const data = {...this.state};
        data.picture_url = data.pictureUrl;
        delete data.pictureUrl;
        delete data.locations;
        console.log(data)
        
        const hatUrl = 'http://localhost:8090/api/hats/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(hatUrl, fetchConfig);
        if (response.ok) {
            const newHat = await response.json();
            console.log(newHat);

            const cleared = {
                fabric: "",
                style: "",
                color: "",
                pictureUrl: "",
                location: "",
            };
            this.setState(cleared)
        }
    }


    async componentDidMount() {
        const url = 'http://localhost:8100/api/locations/'

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({locations: data.locations});
        }
    }
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new hat</h1>
                        <form onSubmit={this.handleSubmit} id="create-hat-form">
                        <div className="form-floating mb-3">
                            <input onChange={this.handleFabricChange} placeholder="Fabric" required type="text" name="fabric" id="fabric" value={this.state.fabric} className="form-control" />
                            <label htmlFor="fabric">Fabric</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleStyleChange} placeholder="Style" required type="text" name="style" id="style" value={this.state.style} className="form-control" />
                            <label htmlFor="style">Style</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleColorChange} placeholder="Color" required type="text" name="color" id="color" value={this.state.color} className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handlePictureUrlChange} placeholder="Picture url" required type="url" name="picture_url" id="picture_url" value={this.state.pictureUrl} className="form-control" />
                            <label htmlFor="picture_url">Picture url</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={this.handleLocationChange} required name="location" id="location" value={this.state.location} className="form-select">
                                <option value="">Choose a location</option>
                                {this.state.locations.map(location => {
                                    return (
                                        <option value={location.id} key={location.id}>
                                            {location.closet_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default HatForm