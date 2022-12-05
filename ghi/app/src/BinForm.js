import React from 'react'

class BinForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            closetName: '',
            binNumber: '',
            binSize: '',
        }
        this.handleClosetNameChange = this.handleClosetNameChange.bind(this);
        this.handleBinNumberChange = this.handleBinNumberChange.bind(this);
        this.handleBinSizeChange = this.handleBinSizeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClosetNameChange(event) {
        const value = event.target.value;
        this.setState({ closetName: value })
    }

    handleBinNumberChange(event) {
        const value = event.target.value;
        this.setState({ sectionNumber: value })
    }

    handleBinSizeChange(event) {
        const value = event.target.value;
        this.setState({ shelfNumber: value })
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.closet_name = data.closetName;
        data.bin_number = data.binNumber;
        data.bin_size = data.binSize;
        delete data.closetName;
        delete data.binNumber
        delete data.binSize
        console.log(data);

        const binUrl = 'http://localhost:8100/api/bins/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(binUrl, fetchConfig);
        if (response.ok) {
            const newBin = await response.json();
            console.log(newBin);

            const cleared = {
                closetName: '',
                binNumber: '',
                binSize: '',
            };
            this.setState(cleared);
        }
    }


render() {
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new bin</h1>
                    <form onSubmit={this.handleSubmit} id="create-location-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handleClosetNameChange} placeholder="Closet name" required type="text" name="closet_name" id="closet_name" value={this.state.closetName} className="form-control" />
                        <label htmlFor="closet_name">Closet name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleBinNumberChange} placeholder="Bin number" required type="number" name="bin_number" id="bin_number" value={this.state.binNumber} className="form-control" />
                        <label htmlFor="bin_number">Bin number</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleBinSizeChange} placeholder="Bin size" required type="number" name="bin_size" id="bin_size" value={this.state.binSize} className="form-control" />
                        <label htmlFor="bin_size">Bin size</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
}
export default BinForm;
