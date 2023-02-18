import React, { Component } from "react";
import HouseCards from "./HouseCards";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavItem } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { orderBy } from "lodash";
import "./Filter.css";
export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyList: props.propertyList.data,
      filteredData: [],
      roomTypes: [],
      bathTypes: [],
      priceRangeArray: [
        [0, 50],
        [50, 100],
        [100, 150],
      ],
      filteredByRoomType: false,
      selectedRoomTypeValue: " ",
      filteredByBathType: false,
      selectedBathTypeValue: " ",
      filteredByPriceRange: false,
      selectedPriceRangeTypeValue: [
        [0, 50],
        [50, 100],
        [100, 150],
      ],
      isVerified: true,
    };
  }
  componentDidMount() {
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
  }
  toggleFilterByType(filterType, filterValue) {
    if (filterType == "roomType") {
      if (filterValue === "clear") {
        this.setState({
          filteredByRoomType: false,
          selectedRoomTypeValue: "",
        });
      } else {
        this.setState({
          filteredByRoomType: true,
          selectedRoomTypeValue: filterValue,
        });
      }
    }
    if (filterType == "bathType") {
      if (filterValue === "clear") {
        this.setState({
          filteredByBathType: false,
          selectedBathTypeValue: "",
        });
      } else {
        this.setState({
          filteredByBathType: true,
          selectedBathTypeValue: filterValue,
        });
      }
    }
    if (filterType == "priceRangeType") {
      if (filterValue === "clear") {
        this.setState({
          filteredByPriceRange: false,
          selectedPriceRangeTypeValue: [],
        });
      } else {
        this.setState({
          filteredByPriceRange: true,
          selectedPriceRangeTypeValue: filterValue,
        });
      }
    }
  }
  handleAllFilters() {
    let filteredProperties = this.state.propertyList;
    if (this.state.filteredByRoomType) {
      filteredProperties = this.handleRoomTypes(filteredProperties);
    }
    if (this.state.filteredByBathType) {
      filteredProperties = this.handleBathTypes(filteredProperties);
    }
    if (this.state.filteredByPriceRange) {
      filteredProperties = this.handlePriceRange(filteredProperties);
    }
    filteredProperties = this.handleVerified(filteredProperties);
    this.setState({ filteredData: filteredProperties });
  }

  handleRoomTypes(propertyList) {
    let filteredDataThroughRooms = propertyList.filter(
      (house) => house.rooms == this.state.selectedRoomTypeValue
    );
    return filteredDataThroughRooms;
  }

  handleBathTypes(propertyList) {
    let filteredDataThroughBaths = propertyList.filter(
      (house) => house.baths == this.state.selectedBathTypeValue
    );
    return filteredDataThroughBaths;
  }
  handlePriceRange(propertyList) {
    let filteredDataThroughPriceRange = propertyList.filter(
      (house) =>
        house.price >= this.state.selectedPriceRangeTypeValue[0] * 1000 &&
        house.price <= this.state.selectedPriceRangeTypeValue[1] * 1000
    );
    let sortedDateThroughPrice = orderBy(
      filteredDataThroughPriceRange,
      ["price"],
      ["asc"]
    );
    return sortedDateThroughPrice;
  }
  handleVerified(propertyList) {
    let filteredDataThroughVerified = propertyList.filter(
      (house) => house.isVerified === this.state.isVerified
    );
    return filteredDataThroughVerified;
  }
  toggleVerified() {
    let oldValue = this.state.isVerified;
    this.setState({ isVerified: !oldValue });
  }

  getFormattedPriceRange(priceRange) {
    if (this.state.filteredByPriceRange === false) {
      return " ";
    }
    return `${priceRange[0] * 1000} AED- ${priceRange[1] * 1000} AED`;
  }
  render() {
    return (
      <>
        <Navbar className="filterNav" bg="light" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">
                <NavDropdown
                  title={`Rooms ${this.state.selectedRoomTypeValue}`}
                  id="basic-nav-dropdown1"
                  className="dropdown"
                >
                  {this.state.roomTypes &&
                    this.state.roomTypes.map((roomType) => {
                      return (
                        <NavDropdown.Item
                          key={roomType}
                          onClick={(event) =>
                            this.toggleFilterByType("roomType", roomType)
                          }
                        >
                          {/* displaying number of rooms */}
                          {roomType}
                        </NavDropdown.Item>
                      );
                    })}
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={(event) =>
                      this.toggleFilterByType("roomType", "clear")
                    }
                  >
                    Clear
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title={`Bathrooms ${this.state.selectedBathTypeValue}`}
                  id="basic-nav-dropdown2"
                  className="dropdown"
                >
                  {this.state.bathTypes &&
                    this.state.bathTypes.map((bathType) => {
                      return (
                        <NavDropdown.Item
                          key={bathType}
                          onClick={(event) =>
                            this.toggleFilterByType("bathType", bathType)
                          }
                        >
                          {/* displaying number of bathrooms */}
                          {bathType}
                        </NavDropdown.Item>
                      );
                    })}
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={(event) =>
                      this.toggleFilterByType("bathType", "clear")
                    }
                  >
                    Clear
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title={`PriceRange ${this.getFormattedPriceRange(
                    this.state.selectedPriceRangeTypeValue
                  )}`}
                  color={"white"}
                  id="basic-nav-dropdown3"
                  className="dropdown"
                >
                  {this.state.priceRangeArray &&
                    this.state.priceRangeArray.map((priceRange) => {
                      return (
                        <NavDropdown.Item
                          key={priceRange}
                          onClick={(event) =>
                            this.toggleFilterByType(
                              "priceRangeType",
                              priceRange
                            )
                          }
                        >
                          {/* displaying number of bathrooms */}
                          {priceRange[0]}AED-{priceRange[1]}AED
                        </NavDropdown.Item>
                      );
                    })}
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={(event) =>
                      this.toggleFilterByType("priceRangeType", "clear")
                    }
                  >
                    Clear
                  </NavDropdown.Item>
                </NavDropdown>

                <NavItem>
                  <Button
                    variant={this.state.isVerified ? "success" : "danger"}
                    onClick={(event) => this.toggleVerified()}
                    className="verifiedBtn"
                  >
                    {this.state.isVerified ? "Verified" : "Not Verfied"}
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    variant="primary"
                    onClick={(event) => this.handleAllFilters()}
                    className="NavBtn"
                  >
                    Filter
                  </Button>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="row">
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
