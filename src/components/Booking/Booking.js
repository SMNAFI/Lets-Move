import React, { useState } from 'react';
import { useParams } from 'react-router';
import './Booking.css';
import { data } from '../../fakeData/fakeData';
import GoogleMap from '../GoogleMap/GoogleMap';
import Result from '../Result/Result';


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
                                    <div>
                                        <Result element={element}></Result>
                                        <Result element={element}></Result>
                                        <Result element={element}></Result>
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
                            <input onBlur={handleChange} type="datetime-local" className="inputField" name="dateTime" required />
                        </div>
                        <div>
                            <input type="submit" value="Submit" className='booking-btn' />
                        </div>
                    </form>
                }
            </div>
            <GoogleMap></GoogleMap>
        </div>
    );
};

export default Booking;