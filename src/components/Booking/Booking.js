import React from 'react';
import { useParams } from 'react-router';
import map from '../../images/Map.png';
import './Booking.css';

const Booking = () => {
    const {type} = useParams();
    const handleBooking = event => {
        event.preventDefault();
    }
    return (
        <div className="booking-container body-container">
            <div className="booking-form">
                <form onSubmit={() => handleBooking}>
                    <p>Pick From</p>
                    <input type="text" name="" placeholder="Mirpur" required />
                    <p>Pick to</p>
                    <input type="text" name="" placeholder="Dhanmondi" required />
                    <div>
                        <input type="submit" value="Submit" className='booking-btn'/>
                    </div>
                </form>
            </div>
            <div className="booking-map">
                <img src={map} alt="" />
            </div>
        </div>
    );
};

export default Booking;