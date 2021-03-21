import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import './Result.css';

const Result = props => {
    const {image, name, price, people} = props.element;
    return (
        <div className="booking-confirm">
            <div>
                <img src={image} alt="" />
            </div>
            <div>
                <h3>{name}</h3>
            </div>
            <div >
                <h3><FontAwesomeIcon icon={faUserFriends} /> {people}</h3>
            </div>
            <div>
                <h3>{price}</h3>
            </div>
        </div>
    );
};

export default Result;