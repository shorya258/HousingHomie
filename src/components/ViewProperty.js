import React, { Component } from "react";
import Filter from "./Filter";
import HouseCards from "./HouseCards";
import data from "./SampleOutput.json";
export class ViewProperty extends Component {
  constructor(props) {
    super(props);
    console.log(data, "data");
    this.state = {
      propertyList: data,
    };
    console.log("hello I am a constructor from news component");
  }
  // async componentDidMount() {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": "da12149eb8msh716e65eef138757p1a0a8djsn59a79f43c9c6",
  //       "X-RapidAPI-Host": "bayut.p.rapidapi.com",
  //     },
  //   };
  //   let url =
  //     "https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-sale&hitsPerPage=15&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4";
  //   let data = await fetch(url, options)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response);
  //       return response.hits;
  //     })
  //     .catch((err) => console.error(err));
  //   console.log(data, "data");
  //   this.setState({
  //     propertyList: data,
  //   });
  // }

  render() {
    console.log(this.state.propertyList, "property list");
    return (
      <div>
        <div className="container">
          <div className="row">
            <Filter propertyList={this.state.propertyList} />
          </div>
        </div>
      </div>
    );
  }
}

export default ViewProperty;
