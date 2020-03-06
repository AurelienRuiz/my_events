import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './SliderImg.sass';

class SliderImg extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="slider-img">
                    <Carousel width="100%" showThumbs={false} showStatus={false} autoPlay={true}>
                        <div>
                            <img src="/img/carousel/1.jpg" />
                        </div>
                        <div>
                            <img src="/img/carousel/2.jpg" />
                        </div>
                        <div>
                            <img src="/img/carousel/3.jpg" />
                        </div>
                        <div>
                            <img src="/img/carousel/4.jpg" />
                        </div>
                    </Carousel>
                </div>
            </React.Fragment>
        );
    }
}

export default SliderImg;