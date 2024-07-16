import React from "react";
import './style.css';
import AddItem from "../../components/itemAdd/addItem";
import ListItem from "../../components/itemList/listItem";
import { Provider } from "react-redux";
import { store } from "../../store";
import EditItem from "../../components/itemEdit/editItem";
var data = require('../../assets/orgDetails.json');

class Order extends React.Component {

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

    if (this.state.orgName === "") {
      this.setState({
        orgName: data.name,
        logoImgUrl: data.logoImgUrl
      })
    }
  }

  fnCalldateTime() {
    this.componentDidMount()
    return (
      <h5 style={{ paddingRight: 20 }}>{this.state.time}</h5>
    )
  }

  fnHomepage() {
    return (
      <div className="main">

        <div className="mainHeader">
          <div style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            display: "flex",
            alignItems: "center"
          }}>
            <img src={this.state.logoImgUrl} style={{
              width: "20px",
              height: "20px",
              borderRadius: "20px"
            }} />
            <span style={{ marginLeft: "10px" }}>{this.state.orgName}</span>
          </div>
          {this.fnCalldateTime()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        Order
      </div>
    )
  }
}

export default Order;
