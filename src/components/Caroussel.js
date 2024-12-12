import Carousel from 'react-bootstrap/Carousel';
import './Caroussel.css';
import React from 'react'
import OverlayContent from './OverlayContent';
import bg1 from '../images/imgonline-com-ua-resize-sL7iPXnhKSiOOV.png';
import bg2 from '../images/imgonline-com-ua-resize-0CsIkD5TPzuXuzX8.png';
import bg3  from '../images/imgonline-com-ua-resize-Fxd9oEZrXTVkjiv.png';
import bg4 from  '../images/imgonline-com-ua-resize-hmIjyxUomoINi.png';
import bg5 from  '../images/imgonline-com-ua-resize-J3lUwCH6ivQVKyCQ.png';
import bg6 from  '../images/imgonline-com-ua-resize-luG74IhT8mmWx.png';
import bg7 from  '../images/imgonline-com-ua-resize-gnolnSLYg5.png';
 function Overlay() {
  return (
    <div>
        <div className="carousel-overlay">
                <div><OverlayContent/></div>
         </div>

    </div>
  )
}


export default function Caroussel() {
  return (
    <div className='container' style={{alignItems: "center",objectPosition:'fit' ,justifyContent: "center", marginTop: '100px' }}>
      <Carousel fade>
        <Carousel.Item>
          <div className="carousel-image">
            <img
              className="d-block w-100"
              src={bg1}
              alt="First slide"
            />
            <div className="carousel-overlay"></div>
          </div>
          <Overlay/>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image">
            <img
              className="d-block w-100"
              src={bg6}
              alt="First slide"
            />
            <div className="carousel-overlay"></div>
          </div>
          <Overlay/>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image">
            <img
              className="d-block w-100"
              src={bg2}
              alt="Second slide"
            />
            <div className="carousel-overlay"></div>
          </div>
          <Overlay/>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image">
            <img
              className="d-block w-100"
              src={bg3}
              alt="Third slide"
            />
          </div>
          <Overlay/>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image">
            <img
              className="d-block w-100"
              src={bg4}
              alt="Third slide"
            />
          </div>
          <Overlay/>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image">
            <img
              className="d-block w-100"
              src={bg7}
              alt="First slide"
            />
            <div className="carousel-overlay"></div>
          </div>
          <Overlay/>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image">
            <img
              className="d-block w-100"
              src={bg5}
              alt="Third slide"
            />
          </div>
          <Overlay/>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
