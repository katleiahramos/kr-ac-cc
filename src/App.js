import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import get from "lodash/get"
import ContactRow from "../src/components/ContactRow"
const api_key = process.env.REACT_APP_API_KEY;


const StyledContainer = styled.div`
  min-width: 540px;
  height: 100%
  overflow: scroll;

  table {
    margin: 5% auto;
    border: 1px solid #CCC;
    border-collapse: collapse;
    width: 75%;

    th {
      height: 28px;
      color: #666;
    }

    tr { 
      border: solid #CCC;
      border-width: 1px 0;
    }

    td {
      padding: 2px;
      height: 46px;
    }

    th {
      padding: 5px;
    }

  }
`

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
  }

  renderContactRows = () => {
    const { contactData } = this.state;

    return get(contactData, "contacts", []).map(contact => (
      <ContactRow key={contact.id} contact={contact} />
    ))
  }
  render() {
    return (
      <StyledContainer className="App">
        <table>
          <thead>
            <tr>
              <th>Contact Name</th>
              <th>Total Value</th>
              <th>Location</th>
              <th>Deals</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {this.renderContactRows()}
          </tbody>
        </table>
      </StyledContainer>
    );
  }
}

export default App;
