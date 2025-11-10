import React from 'react';
import fac from '../asserts/img/fac.jpg';

export const Facilities = () => {
  return (
    <section className="homepage-about spad" id="fac">
      <div className="container ">
        <div className="row ">
          <div className="col-lg-6 ">
            <div className="about-text ">
              <div className="section-title ">
                <h2>
                  “Customers love our <br />
                  facilities”
                </h2>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero mauris, bibendum eget sapien ac, ultrices rhoncus
                ipsum. Donec nec sapien in urna fermentum ornare. Morbi vel ultrices leo. Sed eu turpis eu arcu vehicula fringilla ut vitae
                orci. Suspendisse maximus malesuada.
              </p>
              <a href="# " className="primary-btn ">
                Make a Reservation
              </a>
            </div>
          </div>
          <div className="col-lg-6 ">
            <div className="row ">
              <div className="col-sm-6 ">
                <div className="about-img ">
                  <img src={fac} alt=" " />
                </div>
              </div>
              <div className="col-sm-6 ">
                <div className="about-img ">
                  <img src={fac} alt=" " />
                </div>
              </div>
              <div className="col-sm-6 ">
                <div className="about-img ">
                  <img src={fac} alt=" " />
                </div>
              </div>
              <div className="col-sm-6 ">
                <div className="about-img ">
                  <img src={fac} alt=" " />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
