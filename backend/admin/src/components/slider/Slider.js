import React, { useEffect } from 'react';
import $ from 'jquery';
import logo from '../../asserts/img/logo.png';
import slider1 from '../../asserts/slider/slider1.jpg';
import slider2 from '../../asserts/slider/sl1.jpg';
import slider3 from '../../asserts/slider/sl2.jpg';
import Search from '../Search';
function Slider() {
  useEffect(() => {
    $('#logotxt').fadeIn(3000);
    setTimeout(function () {
      $('#logoanimated').fadeOut();
    }, 3000);
    $('#carouselExampleControls2').carousel();
    $('.carouselExampleControls4').carousel({
      interval: 500
    });
  }, []);
  return (
    <>
      <div
        className="w-100 text-center"
        id="logoanimated"
        style={{
          position: 'absolute',
          zIndex: 3333,
          height: '100%',
          background: '#f5c828',
          width: '100%'
        }}
      >
        <img
          src={logo}
          id="logotxt"
          alt=""
          style={{ textAlign: 'center', marginTop: '16%', display: 'none', marginBottom: 'auto' }}
          height="200px;"
        />
      </div>
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={slider1} alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-" src={slider2} alt="Second slide" />
          </div>
          <div className=" carousel-item ">
            <img className="d-block w-100 " src={slider3} alt="Third slide " />
          </div>
        </div>
        <a className="carousel-control-prev " href="#carouselExampleControls " data-slide="prev ">
          <span className="carousel-control-prev-icon"></span>
          <span className="sr-only ">Previous</span>
        </a>
        <a className="carousel-control-next " href="#carouselExampleControls " data-slide="next ">
          <span className="carousel-control-next-icon "></span>
          <span className="sr-only ">Next</span>
        </a>
      </div>
      <Search />
    </>
  );
}

export default Slider;
