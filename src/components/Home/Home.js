import React from 'react';
import { data } from '../../fakeData/fakeData';
import VehicleCard from '../VehicleCard/VehicleCard';
import './Home.css';

const Home = () => {
    return (
        <div className="body-container cards-container">
            {
                data.map( d => <VehicleCard info={d} key={d.id} />)
            }
        </div>
    );
};

export default Home;