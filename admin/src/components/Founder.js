import React from 'react';
import founder from '../asserts/img/founder.jpg';

export const Founder = () => {
  return (
    <section className="intro-section spad" id="founder">
      <div className="container ">
        <div className="row ">
          <div className="col-lg-6 ">
            <div className="intro ">
              <div className="section-title ">
                <span style={{ fontSize: '30 px' }}>FOUNDER AND CHAIRMAN</span>
                <br />
                <h2>
                  A great stay in a<br /> lovely hotel.
                </h2>
              </div>
              <q>You know youre in love when you cant fall asleep because , reality is finally better than your dreams.</q>
            </div>
          </div>
          <div className="col-lg-6 ">
            <div className="intro- room-section ">
              <img src={founder} alt=" " />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
