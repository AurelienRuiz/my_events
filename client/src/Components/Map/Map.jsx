import React from "react";
import Loading from '../Loading/Loading';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends React.Component {

    render() {
            return (
            <Map
                google={this.props.google}
                zoom={14}
                initialCenter={{ lat: this.props.lat, lng: this.props.long }}
                
            >
                <Marker
                onClick={this.onMarkerClick}
                name={"Current location"}
                position={{ lat: this.props.lat, lng: this.props.long }}
                />
            </Map>
            );
    }
}

export default GoogleApiWrapper({
apiKey: "AIzaSyAE0dx3rxbEmZYSenTWPVqvLRqIoYnO4Ok"
})(MapContainer);