import {React, useEffect, useState} from 'react';
import { Link, useParams , useNavigate } from 'react-router-dom'

function HatDetail (props) {
    let navigate = useNavigate()
    let spotId = useParams()
    const displaySpot = parseInt(spotId.id)
    const HatUrl = `http://localhost:8090/api/hats/${displaySpot}`
    const [hat, setHat] = useState(null)

    useEffect(() => {
        fetch(HatUrl)
            .then(res => {
                return res.json();
            })
            .then(data => {
            return data
            })
            .then(hat => {
                const locationUrl = `http://localhost:8100${hat.location.import_href}`
                fetch(locationUrl)
                .then(respone => {
                    return respone.json();
                })
                .then(location => {
                    const combinedData = Object.assign({}, hat, location)
                    setHat(combinedData)
                })
            })
    }, []);

    const handleClick = (displaySpot) => {
        let answer = window.confirm('Hat will be deleted')
        if (answer === true) {
            const requestOptions = {
                method: 'DELETE'
            }
            fetch(HatUrl, requestOptions)
            .then(response => {
                return response.json();
            })
            .then(result => {
                const hatDeleted = result["deleted"]
                if (hatDeleted === true) {
                    window.alert("The hat was deleted")
                    navigate("/hats")
                } else {
                    window.alert("Something went wrong. The hat was not deleted")
                }
            })
        } else {
            console.log("Chose not to delete")
        }
    }

    return (
        <>
        {hat &&
        <div key={hat.id} className="card mb-3 shadow">
        <img src={hat.picture_url} className="card-img-top" />
        <div className="card-body">
            <h5 className="card-title">{hat.style}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
                {hat.fabric}
            </h6>
            <p className="card-text">
                {hat.color}
            </p>
        </div>
        <div className="card-footer">
            Closet Name: {hat.location.closet_name} | Section Number: {hat.section_number} | Shelf Number: {hat.shelf_number}
        </div>
        <button onClick={handleClick} className="btn btn-danger">Delete</button>
        </div>
            }
        </>
    )
}

export default HatDetail