import React, { useState } from 'react';
import { useParams } from 'react-router';
import map from '../../images/Map.png';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import './Booking.css';
import { data } from '../../fakeData/fakeData';


const Booking = () => {
    const { type } = useParams();
    const [destination, setDestination] = useState({
        to: '',
        from: '',
        dateTime: '',
        confirm: false
    })
    const handleBooking = event => {
        const newInfo = { ...destination };
        newInfo.confirm = true;
        setDestination(newInfo);
        event.preventDefault();
    }
    const handleChange = event => {
        const newDestination = { ...destination };
        newDestination[event.target.name] = event.target.value;
        setDestination(newDestination);
    }

    return (
        <div className="booking-container">
            <div className="booking-form">
                {destination.confirm ?
                    <div>
                        <div className="booking-location">
                            <h2>{destination.from}</h2>
                            <h3>to</h3>
                            <h2>{destination.to}</h2>
                        </div>
                        <div> {
                            data.map(element => {
                                return (
                                    Object.values(element)[2] === type &&
                                    <div className="booking-confirm">
                                        <div>
                                            <img src={element.image} alt="" />
                                        </div>
                                        <div>
                                            <h3>{element.name}</h3>
                                        </div>
                                        <div >
                                            <h3><PeopleAltIcon />{element.people}</h3>
                                        </div>
                                        <div>
                                            <h3>{element.price}</h3>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    : <form onSubmit={handleBooking}>
                        <div>
                            <p>Pick From</p>
                            <input onBlur={handleChange} className="inputField" type="text" name="from" placeholder="Dhaka" required />
                        </div>
                        <div>
                            <p>Pick to</p>
                            <input onBlur={handleChange} className="inputField" type="text" name="to" placeholder="Mymensingh" required />
                        </div>
                        <div>
                            <p>Travel Date and Time</p>
                            <input onBlur={handleChange} type="datetime-local" className="inputField" name="dateTime"/>
                        </div>
                        <div>
                            <input type="submit" value="Submit" className='booking-btn' />
                        </div>
                    </form>
                }
            </div>
            <div className="booking-map">
                <img src={map} alt="" />
            </div>
        </div>
    );
};

export default Booking;