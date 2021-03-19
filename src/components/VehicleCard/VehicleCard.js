import React from 'react';
import { useHistory } from 'react-router';
import './VehicleCard.css';

const VehicleCard = props => {
    const {name, type, image} = props.info;
    const history = useHistory();
    const handleBook = type => {
        history.push(`/booking/${type}`);
    }
    return (
        <div className="card" onClick={() => handleBook(type)}>
            <img src={image} alt=""/>
            <h1>{name}</h1>
        </div>
    );
};

export default VehicleCard;