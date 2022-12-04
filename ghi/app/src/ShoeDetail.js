import { React, useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'


function ShoeDetail (props) {
    let navigate = useNavigate()
    let spotId = useParams()
    const displaySpot = parseInt(spotId.id)
    const ShoeUrl = `http://localhost:8080/api/shoes/${displaySpot}/`
    const [shoe, setShoe] = useState(null)

    useEffect(() => {
        fetch(ShoeUrl)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setShoe(data)
            })
    }, []);

    const handleClick = (displaySpot) => {
        let answer = window.confirm('Shoe will be deleted')
        if (answer === true){
            const requestOptions = {
                method: "DELETE"
            }
            fetch(ShoeUrl, requestOptions)
                .then(response =>{
                        return response.json()
                    })
                    .then(result => {
                        const shoeDeleted = result["deleted"]
                        if (shoeDeleted === true) {
                            window.alert("The shoe was deleted")
                            navigate("/shoes")
                        } else {
                            window.alert("Something went wrong. The shoe was not deleted")
                        }
                    })
        } else {
            console.log("Chose not to delete")
        }
    }

    return (
        <>
          {shoe &&
            <div key={shoe.id} className="card mb-3 shadow">
            <img src={shoe.picture_url} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{shoe.model}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {shoe.manufacturer}
              </h6>
              <p className="card-text">
                {shoe.color}
              </p>
            </div>
            <div className="card-footer">
              Closet: {shoe.bin.closet_name}
            </div>
            <button onClick={handleClick} className="btn btn-danger">Delete</button>
          </div>
          }
        </>
    )
}

export default ShoeDetail
