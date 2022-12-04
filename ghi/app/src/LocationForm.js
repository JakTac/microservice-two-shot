import React from 'react'

class LocationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            closetName: '',
            sectionNumber: '',
            shelfNumber: '',
        }
        this.handleClosetNameChange = this.handleClosetNameChange.bind(this);
        this.handleSectionNumberChange = this.handleSectionNumberChange.bind(this);
        this.handleShelfNumberChange = this.handleShelfNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClosetNameChange(event) {
        const value = event.target.value;
        this.setState({ closetName: value })
    }

    handleSectionNumberChange(event) {
        const value = event.target.value;
        this.setState({ sectionNumber: value })
    }

    handleShelfNumberChange(event) {
        const value = event.target.value;
        this.setState({ shelfNumber: value })
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.closet_name = data.closetName;
        data.section_number = data.sectionNumber;
        data.shelf_number = data.shelfNumber;
        delete data.closetName;
        delete data.sectionNumber
        delete data.shelfNumber
        console.log(data);

        const locationUrl = 'http://localhost:8100/api/locations/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            const newLocation = await response.json();
            console.log(newLocation);

            const cleared = {
                closetName: '',
                sectionNumber: '',
                shelfNumber: '',
            };
            this.setState(cleared);
        }
    }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new location</h1>
                        <form onSubmit={this.handleSubmit} id="create-location-form">
                        <div className="form-floating mb-3">
                            <input onChange={this.handleClosetNameChange} placeholder="Closet name" required type="text" name="closet_name" id="closet_name" value={this.state.closetName} className="form-control" />
                            <label htmlFor="closet_name">Closet name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleSectionNumberChange} placeholder="Section number" required type="number" name="section_number" id="section_number" value={this.state.sectionNumber} className="form-control" />
                            <label htmlFor="section_number">Section number</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleShelfNumberChange} placeholder="Shelf number" required type="number" name="shelf_number" id="shelf_number" value={this.state.shelfNumber} className="form-control" />
                            <label htmlFor="shelf_number">Shelf number</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default LocationForm;
