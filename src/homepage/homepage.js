import React from "react";
import './style.css';
import AddItem from "../itemAdd/addItem";
import ListItem from "../itemList/listItem";
import { Provider } from "react-redux";
import { store } from "../store";

// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";

// const sql = require('mssql')

// const config = {
//   server: 'localhost',
//   database: 'HOTEL_STOCK_MGMT',
//   user: 'sa',
//   password: '77272662TGp',
//   options: {
//     encrypt: true
//   }
// }
var data = require('../assets/orgDetails.json');

// const pool = new sql.ConnectionPool(config,() => {});
class Homepage extends React.Component {


  constructor() {
    super();
    this.state = {
      time: "",
      orgName: "",
      logoImgUrl: ""
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        time: new Date().getDate().toFixed(0).padStart(2, '0') + "  " +
          new Date().toLocaleString('default', { month: 'long' }) + ", " +
          new Date().getFullYear().toFixed(0).padStart(2, '0') + "   " +
          new Date().getHours().toFixed(0).padStart(2, '0') + " : " +
          new Date().getMinutes().toFixed(0).padStart(2, '0') + " : " +
          new Date().getSeconds().toFixed(0).padStart(2, '0')
      })
    }, 1000);

    //
    // console.log("DATA", data)
    if (this.state.orgName === "") {
      this.setState({
        orgName: data.name,
        logoImgUrl: data.logoImgUrl
      })
    }
    // this.state.orgName === "" ? this.setState({orgName: data.name}) : null
  }

  fnCalldateTime() {
    //  let date = new Date();
    //  date.getDate()
    this.componentDidMount()
    return (
      <h5 style={{ paddingRight: 20 }}>{this.state.time}</h5>
    )
  }

  fnHomepage() {
    // console.log("POOL", pool);
    return (
      <div className="main">

        {/* <GoogleLogin  
                onSuccess={response => {
                    console.log("RESPONSE", response)
                    const token = response.credential; // "eyJ0eXAiO.../// jwt token";
                    const decoded = jwtDecode(token);
    
                    console.log(decoded);
                }}
                onError={response => {
                    console.log("ERROR", response)
                }}
            /> */}
        {/* <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header> */}
        <div className="mainHeader">
          <div style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            display: "flex",
            alignItems: "center"
          }}>
            <img src={this.state.logoImgUrl} style={{    width: "20px",
    height: "20px",
    borderRadius: "20px"}} />
            <span style={{marginLeft:"10px"}}>{this.state.orgName}</span>
          </div>
          {this.fnCalldateTime()}
        </div>
        {/* <div className="mainBody">
            <div>
              Calendar
            </div>
            <div>
            <textarea />
            </div>
            </div> */}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.fnHomepage()}

<div style={{
  flexDirection:"row",
  display:"flex",
  width:"100%"
}}>
        {<AddItem
        flex="0.5"
          />}
        <ListItem
        flex="1"
         />
        </div>
      </div>
    )
  }
}

export default Homepage;
