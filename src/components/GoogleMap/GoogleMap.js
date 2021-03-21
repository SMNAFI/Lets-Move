import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

const mapStyles = {
  maxWidth: '100vh',
  height: '500px',
  borderRadius: '8px',
  marginRight: '60px', 
};
export class MapContainer extends Component {
  render() {
    return (
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat:  23.777176, lng: 90.399452}}
        >
          <Marker position={{ lat:  23.777176, lng: 90.399452}} />
        </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBbA9-Wcf7fXmDbAE2IievQXJzFGie5fMo')
})(MapContainer)
