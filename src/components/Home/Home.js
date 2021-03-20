import React from 'react';
import { data } from '../../fakeData/fakeData';
import VehicleCard from '../VehicleCard/VehicleCard';
import './Home.css';

const Home = () => {
    return (
        <div className="cards-container">
            {
                data.map(dt => <VehicleCard info={dt} key={dt.id} />)
            }
        </div>
    );
};

export default Home;