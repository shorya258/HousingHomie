// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import "./HouseCards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseCrack } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faShower } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
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
            <div className="cardBody">
              <div className="card-text">
                <div className="roomWrapper">
                  <div className="roomText">Bedrooms</div>
                  <div className="roomValue">
                    <span className="value">{house.rooms}</span>
                    <FontAwesomeIcon icon={faBed} size={"lg"} />
                  </div>
                </div>
                <div className="roomWrapper">
                  <div className="roomText">Washrooms</div>
                  <div className="roomValue">
                    <span className="value">{house.baths}</span>
                    <FontAwesomeIcon icon={faShower} size={"lg"} />
                  </div>
                </div>
              </div>
              <div className="roomWrapper">
                <div className="roomText">Verified</div>
                <div className="roomValue">
                  {house.isVerified ? (
                    <FontAwesomeIcon color="green" icon={faCheck} size={"lg"} />
                  ) : (
                    <FontAwesomeIcon color="red" icon={faXmark} size={"lg"} />
                  )}
                </div>
              </div>
              <div className="roomWrapper">
                <div className="roomText">Price</div>
                <div className="roomValue">{house.price} AED/month</div>
              </div>
            </div>
            <a href="/" className="btn PrimaryBtn">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default HouseCards;
