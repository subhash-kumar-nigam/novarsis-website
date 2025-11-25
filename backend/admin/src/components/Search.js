import React from 'react';
function Search() {
  return (
    <section className="search-filter">
      <div className="container"></div>
      <div className="row bg-light p-3">
        <div className="col-lg-12 my-3">
          <h4>
            Check Availability
            <span className="float-right btn-danger p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </span>
          </h4>
        </div>
        <div className="col-sm-2">
          <p>From</p>
          <input type="date" className="form-control" />
        </div>
        <div className="col-sm-2">
          <p>To</p>
          <input type="date" className="form-control" />
        </div>
        <div className="col-sm-4">
          <div className="row">
            <div className="single-quantity col-sm-4">
              <p>Adults</p>
              <div className="pro-qty ">
                <input type="number" className="form-control" placeholder="0" />
              </div>
            </div>
            <div className="single-quantity col-sm-4">
              <p>Children</p>
              <div className="pro-qty ">
                <input type="number" className="form-control" placeholder="0" />
              </div>
            </div>
            <div className="single-quantity col-sm-4 ">
              <p>Rooms</p>
              <div className="pro-qty ">
                <input type="number" className="form-control" placeholder="0" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <p>Room</p>
          <select className="suit-select form-control">
            <option>Eg. Master suite</option>
            <option value=" ">Double Room</option>
            <option value=" ">Single Room</option>
            <option value=" ">Special Room</option>
          </select>
        </div>
        <div className="col-sm-1">
          <p>sds</p>
          <button type="submit" className="btn btn-success btn-block">
            Go
          </button>
        </div>
      </div>
    </section>
  );
}

export default Search;
