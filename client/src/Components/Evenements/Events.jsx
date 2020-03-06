import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import config from '../../config.json';
import "./Events.sass";

class Events extends Component {

    parseDate(date) {
        var objDate = new Date(date);
        return this.dateFormat(objDate.getDate()) + "/" + this.dateFormat(objDate.getMonth()+1) + "/" + objDate.getFullYear();
    }

    dateFormat(nbr) {
        if(nbr <= 9)
            return "0" + nbr
        return nbr
    }

    showEvents(id) {
        this.props.setCurrentPage('detailsEvents', id)
    }

    render(){
        if(this.props.events.length > 0)
            return(
                <React.Fragment>
                    <div className="container-home">
                        <div className="events-container">
                            {this.props.events.map(events => {
                            return <div className="events-card" key={events.id} title={events.title}>
                                <div className="meta">
                                    <div className="photo"></div>
                                </div>
                                <div className="description">
                                    <h1>{events.title.substring(0, 15) + "..."}</h1>
                                    <h2><i className="fas fa-map-marker-alt"></i>{events.venue_name}</h2>
                                    <h2><i className="fas fa-calendar-alt"></i>{this.parseDate(events.start_time)} &gt; <i className="fas fa-calendar-alt"></i>{this.parseDate(events.stop_time)}</h2>
                                    <p className="read-more">
                                        <a onClick={() => this.showEvents(events.id)}>Voir plus</a>
                                    </p>
                                </div>
                            </div>
                            })}
                        </div>
                    </div>
                    <Pagination
                        activePage={this.props.currentPage}
                        itemsCountPerPage={10}
                        totalItemsCount={parseInt(this.props.totalPage)}
                        pageRangeDisplayed={5}
                        onChange={(pageNumber) => this.props.changePage(pageNumber)}
                    />
                </React.Fragment>
            );
        else
            return <div className="no-result">
                <h4>Hummm, aucun évènement trouvé...</h4>
                <img src="https://media.giphy.com/media/h3v63bGeVb1pdgFtTx/source.gif" alt="gif-no-result"/>
            </div>
    }
}

export default Events;