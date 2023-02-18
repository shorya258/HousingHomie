import React, { Component } from "react";

export class HouseCards extends Component {
  render() {
    let { house } = this.props;
    return (
      <div>
        <div className="card mx-4 my-4">
          <img
            src={house.coverPhoto.url}
            className="card-img-top"
            alt="house img"
          />
          <div className="card-body">
            <h5 className="card-title">{house.title}</h5>
            <p className="card-text">
              baths: {house.baths} purpose :{house.purpose}
              price: {house.price} rooms:{house.rooms}
            </p>
            <a href="/" className="btn btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default HouseCards;
