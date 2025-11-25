import React from 'react';
import author from '../asserts/img/author.png';

export const Guestbook = () => {
  return (
    <section className="testimonial-section spad" id="guest">
      <div className="container ">
        <div className="row ">
          <div className="section-title ">
            <h2>Guestbook</h2>
          </div>
        </div>
        <div className="row ">
          <div className="col-lg-6 ">
            <div className="testimonial-item ">
              <div className="ti-time ">02 / 02 / 2019</div>
              <h4>We loved our stay</h4>
              <div className="rating ">
                <i className="fa fa-star "></i>
                <i className="fa fa-star "></i>
                <i className="fa fa-star "></i>
                <i className="fa fa-star "></i>
                <i className="fa fa-star "></i>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiselit. Vivamus libero mauris, bibendum eget sapien ac, ultrices rhoncus ipsum.
                Donec nec sapien in urna fermentum ornare.
              </p>
              <div className="ti-author ">
                <div className="author-pic ">
                  <img src={author} alt=" " />
                </div>
                <div className="author-text ">
                  <h6>
                    JOHN DOE <span>Madrid</span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 ">
            <div className="testimonial-item ">
              <div className="ti-time ">02 / 02 / 2019</div>
              <h4>I will come back again</h4>
              <div className="rating ">
                <i className="fa fa-star "></i>
                <i className="fa fa-star "></i>
                <i className="fa fa-star "></i>
                <i className="fa fa-star "></i>
                <i className="fa fa-star "></i>
              </div>
              <p>
                Ipsum dolor sit amet, consectetur adipiselit. Vivamus libero mauris, bibendum eget sapien ac, ultrices rhoncus ipsum. Donec
                nec sapien in urna fermentum ornare.
              </p>
              <div className="ti-author ">
                <div className="author-pic ">
                  <img src={author} alt=" " />
                </div>
                <div className="author-text ">
                  <h6>
                    Maria Smith <span>Madrid</span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
