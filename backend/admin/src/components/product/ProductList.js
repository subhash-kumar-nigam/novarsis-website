import React from 'react';

const data = [
  {
    id: 1,
    name: 'yash',
    description:
      'Standard Rooms at Hotel Prince Viraj are crafted with plush wooden interiors and a stunning marble flooring which creates an impeccable ambience for our guests. With a 245 square feet of space, furnished with a plethora of amenities, our Standard rooms offer an unparalleled experience of comfort. Book your grand family stay at our rooms in Jabalpur and enjoy our top of the line facilitie.',
    url: 'https://images.freeimages.com/images/large-previews/355/poppies-2-1334190.jpg?fmt=webp&w=500'
  },
  {
    id: 2,
    name: 'yash',
    description:
      'Standard Rooms at Hotel Prince Viraj are crafted with plush wooden interiors and a stunning marble flooring which creates an impeccable ambience for our guests. With a 245 square feet of space, furnished with a plethora of amenities, our Standard rooms offer an unparalleled experience of comfort. Book your grand family stay at our rooms in Jabalpur and enjoy our top of the line facilities .',
    url: 'https://images.freeimages.com/images/large-previews/355/poppies-2-1334190.jpg?fmt=webp&w=500'
  },

  {
    id: 3,
    name: 'yash',
    description:
      'Standard Rooms at Hotel Prince Viraj are crafted with plush wooden interiors and a stunning marble flooring which creates an impeccable ambience for our guests. With a 245 square feet of space, furnished with a plethora of amenities, our Standard rooms offer an unparalleled experience of comfort. Book your grand family stay at our rooms in Jabalpur and enjoy our top of the line facilities .',
    url: 'https://images.freeimages.com/images/large-previews/355/poppies-2-1334190.jpg?fmt=webp&w=500'
  },

  {
    id: 4,
    name: 'yash',
    description:
      'Standard Rooms at Hotel Prince Viraj are crafted with plush wooden interiors and a stunning marble flooring which creates an impeccable ambience for our guests. With a 245 square feet of space, furnished with a plethora of amenities, our Standard rooms offer an unparalleled experience of comfort. Book your grand family stay at our rooms in Jabalpur and enjoy our top of the line facilities .',
    url: 'https://images.freeimages.com/images/large-previews/355/poppies-2-1334190.jpg?fmt=webp&w=500'
  }
];
function ProductList() {
  return (
    <>
      <section className="intro-section spad">
        <div className="container">
          {data.length
            ? data.map((item, index) => {
                return (
                  <div className="row my-5" key={index}>
                    <div className={item.id % 2 ? 'col-lg-6' : 'col-lg-6 order-last'}>
                      <div className="intro-left">
                        <div className="section-title ">
                          <span>a memorable holliday</span>
                          <h2>{item?.name}</h2>
                        </div>
                        <p>{item?.description}</p>
                        <a href="# " className="primary-btn">
                          Book
                        </a>
                      </div>
                    </div>
                    <div className=" image slider col-lg-6">
                      <div className="intro- room-section">
                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                          <div className="carousel-inner">
                            <div className="carousel-item active">
                              <img className="d-block w-100" src={item?.url} alt=" slide" />
                            </div>
                            <div className="carousel-item">
                              <img className="d-block w-100" src={item?.url} alt=" slide" />
                            </div>
                          </div>
                          <a
                            className="carousel-control-prev"
                            href="#carouselExampleControls<?php echo $cid; ?>"
                            role="button"
                            data-slide="prev"
                          >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                          </a>
                          <a
                            className="carousel-control-next"
                            href="#carouselExampleControls<?php echo $cid; ?>"
                            role="button"
                            data-slide="next"
                          >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : 'No data avaliable'}
        </div>
      </section>
    </>
  );
}

export default ProductList;
