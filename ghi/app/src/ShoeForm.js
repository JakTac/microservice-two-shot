import React from 'react';


class ShoeForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        model: '',
        manufacturer: '',
        color: '',
        picture_url: '',
        bins: []
      };
      this.handleModelChange = this.handleModelChange.bind(this);
      this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
      this.handleColorChange = this.handleColorChange.bind(this);
      this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
      this.handleBinChange = this.handleBinChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.bins;
        console.log(data);

        const shoeUrl = 'http://localhost:8080/api/shoes/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
          const newShoe = await response.json();
          console.log(newShoe);

          const cleared = {
            Model: '',
            manufacturer: '',
            color: '',
            picture_url: '',
            bin: ''
          };
          this.setState(cleared);
        }
      }

    handleModelChange(event) {
        const value = event.target.value;
        this.setState({model: value})
    }

    handleManufacturerChange(event) {
        const value = event.target.value;
        this.setState({manufacturer: value})
    }

    handleColorChange(event) {
        const value = event.target.value;
        this.setState({color: value})
    }

    handlePictureUrlChange(event) {
        const value = event.target.value;
        this.setState({picture_url: value})
    }

    handleBinChange(event) {
        const value = event.target.value;
        this.setState({bin: value})
    }

    async componentDidMount() {
      const url = 'http://localhost:8100/api/bins/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data.bins)
        this.setState({bins: data.bins})
      }
    }

    render() {
      return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a shoe</h1>
            <form onSubmit={this.handleSubmit} id="create-conference-form">
                <div className="form-floating mb-3">
                    <input onChange={this.handleManufacturerChange} placeholder="manufacturer" value={this.state.manufacturer}
                    required type="text" name="manufacturer" id="manufacturer" className="form-control" />
                    <label htmlFor="manufacturer">Manufacturer</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleModelChange} placeholder="model" value={this.state.model}
                    required type="text" name="model" id="model" className="form-control" />
                    <label htmlFor="model">Model</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleColorChange} placeholder="color" value={this.state.color}
                    required type="text" name="color" id="color" className="form-control" />
                    <label htmlFor="color">Color</label>
                </div>
                <div className="mb-3">
                    <label htmlFor="picture_url" className="form-label">Picture URL</label>
                    <input onChange={this.handlePictureUrlChange} value={this.state.picture_url} type="url"
                    required id="picture_url" name="picture_url" className="form-control" />
                </div>
                <div className="mb-3">
                        <select onChange={this.handleBinChange} required id="bin" name="bin" className="form-select">
                            <option value="">Choose a bin</option>
                            {this.state.bins.map(bin => {
                                return (
                                    <option key={bin.id} value={bin.id}>
                                        {bin.closet_name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
        </div>
      );
    }
  }

export default ShoeForm;