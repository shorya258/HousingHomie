import React, { Component } from "react";
import HouseCards from "./HouseCards";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
export default class Filter extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      propertyList: props.propertyList.data,
      filteredData: [],
      roomTypes: [],
      bathTypes: [],
    };
    console.log("hello I am a constructor from news component");
  }
  componentDidMount() {
    console.log(this.state.propertyList, "list");
    this.setState({ filteredData: this.state.propertyList });
    this.fetchRoomTypes();
    this.fetchBathTypes();
  }
  fetchRoomTypes() {
    let roomTypes = this.state.propertyList
      // filter out houses which have rooms > 0 only
      .filter((house) => house.rooms > 0)
      //   extract the rooms out of houses
      .map((house) => {
        return house.rooms;
      });
    //  extract unique values only out of all roomTypes
    let setRoomTypes = new Set(roomTypes.sort());
    this.setState({ roomTypes: Array.from(setRoomTypes) });
    // console.log(roomTypes, "roomtypes");
    // console.log(setRoomTypes, "setroomtypes");
  }
  fetchBathTypes() {
    let bathTypes = this.state.propertyList
      // filter out houses which have baths > 0 only
      .filter((house) => house.baths > 0)
      //   extract the baths out of houses
      .map((house) => {
        return house.baths;
      });
    //  extract unique values only out of all bathTypes
    let setBathTypes = new Set(bathTypes.sort());
    this.setState({ bathTypes: Array.from(setBathTypes) });
    console.log(bathTypes, "bathtypes");
    console.log(setBathTypes, "setbathtypes");
  }
  handleRoomTypes(roomType) {
    let filteredDataThroughRooms = this.state.propertyList.filter(
      (house) => house.rooms == roomType
    );
    this.setState({ filteredData: filteredDataThroughRooms });
    // console.log(filteredDataThroughRooms, "room filter data");
  }

  handleBathTypes(bathType) {
    let filteredDataThroughBaths = this.state.propertyList.filter(
      (house) => house.baths == bathType
    );
    this.setState({ filteredData: filteredDataThroughBaths });
    // console.log(filteredDataThroughBaths, "bath filter data");
  }
  render() {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Rooms" id="basic-nav-dropdown">
                  {this.state.roomTypes &&
                    this.state.roomTypes.map((roomType) => {
                      return (
                        <NavDropdown.Item
                          key={roomType}
                          onClick={(event) =>
                            this.handleRoomTypes(event.target.text)
                          }
                        >
                          {/* displaying number of rooms */}
                          {roomType}
                        </NavDropdown.Item>
                      );
                    })}
                  <NavDropdown.Divider />
                </NavDropdown>
                <NavDropdown title="Bathrooms" id="basic-nav-dropdown">
                  {this.state.bathTypes &&
                    this.state.bathTypes.map((bathType) => {
                      return (
                        <NavDropdown.Item
                          key={bathType}
                          onClick={(event) =>
                            this.handleBathTypes(event.target.text)
                          }
                        >
                          {/* displaying number of bathrooms */}
                          {bathType}
                        </NavDropdown.Item>
                      );
                    })}
                  <NavDropdown.Divider />
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div>
          {this.state.filteredData.map((house) => {
            return (
              <div className="col-md-4" key={house.id}>
                <HouseCards house={house} />
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
