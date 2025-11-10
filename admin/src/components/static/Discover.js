import React from 'react';
import vidhan from '../../asserts/img/vidhan.jpg';

const Discover = () => {
  return (
    <section className="intro-section spad ">
      <div className="text-center mt-3">
        <i> Discover</i>
        <p className="mt-3">
          <i className="text-dark">The Prince Viraj</i>
        </p>
      </div>
      <div className="container ">
        <div className="row intro-text ">
          <div className="col-lg-6 ">
            <div className="intro-left ">
              <div className="section-title ">
                <span>a memorable holliday</span>
                <h2>
                  A great Time in a<br /> lovely hotel.
                </h2>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas. Donec in sodales dui, a blandit nunc. Pellentesque
                id eros venenatis, sollicitudin neque sodales, vehicula nibh. Nam massa odio, porttitor vitae efficitur non, ultricies
                volutpat tellus.
              </p>
            </div>
          </div>
          <div className="col-lg-6 ">
            <div className="intro- room-section ">
              <img src={vidhan} alt=" " />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discover;
