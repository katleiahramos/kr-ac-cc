import React from "react";
import logo from "./logo.svg";
import "./App.css";

const api_key = process.env.REACT_APP_API_KEY;

class App extends React.Component {
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
      .then(rsp => console.log(rsp))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jill</td>
              <td>Smith</td>
              <td>50</td>
            </tr>
            <tr>
              <td>Eve</td>
              <td>Jackson</td>
              <td>94</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
