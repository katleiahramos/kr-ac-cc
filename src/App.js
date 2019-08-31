import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import get from "lodash/get"
import ContactRow from "../src/components/ContactRow"
const api_key = process.env.REACT_APP_API_KEY;

class App extends React.Component {
  state = {
    contactData: null
  }
  componentDidMount() {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://lamppoststudios.api-us1.com/api/3/contacts",
      {
        headers: {
          "Api-Token": api_key,
          "x-requested-with": "xhr"
        }
      }
    )
      .then(rsp => rsp.json())
      .then(rsp => this.setState({ contactData: rsp }))
      .catch(err => console.log(err));

    fetch(
      "https://cors-anywhere.herokuapp.com/https://lamppoststudios.api-us1.com/api/3/contacts/856/contactTags",
      {
        headers: {
          "Api-Token": api_key,
          "x-requested-with": "xhr"
        }
      }
    )
      .then(rsp => rsp.json())
      .then(rsp => console.log(rsp))
      .catch(err => console.log(err));
  }

  calculateTotalValue = (arrayOfStrVals) => {
    let totalValue = 0;
    arrayOfStrVals.forEach(value => totalValue += parseInt(value))
    return totalValue
  }

  calculateTotalDeals = (contactId) => {
    let numTotalDeals;
    fetch(
      `https://cors-anywhere.herokuapp.com/https://lamppoststudios.api-us1.com/api/3/contacts/${contactId}/contactTags`,
      {
        headers: {
          "Api-Token": api_key,
          "x-requested-with": "xhr"
        }
      }
    )
      .then(rsp => rsp.json())
      .then(tagData => {
        numTotalDeals = tagData.contactTags.length
        console.log("in calc total dealss .then", numTotalDeals)
      })
      .catch(err => console.log(err));
    console.log("in calc total dealss", numTotalDeals)
    return numTotalDeals
  }

  renderContactRows = () => {
    const { contactData } = this.state;
    console.log("IN CONTACT ROWS", this.state.contactData)

    return get(contactData, "contacts", []).map(contact => (
      <ContactRow key={contact.id} contact={contact} />
    ))
  }
  render() {
    return (
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>Contact Name</th>
              <th>Total Value</th>
              <th>Location Deals</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {this.renderContactRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
