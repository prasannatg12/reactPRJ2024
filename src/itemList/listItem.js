import React from "react";
import './style.css';
import ReactWhatsapp from 'react-whatsapp';
import { useSelector } from "react-redux";
var data = require('../assets/orgDetails.json');


export default function ListItem(props) {

  let items = useSelector((state) => state.items)

  // items = [
  //   {"name":"Paneer Ghee Roast", "price":"180", "quantity":"200"},
  //   {"name":"Chicken Biryani", "price":"320", "quantity":"200"},
  //   {"name":"Gobi 65", "price":"120", "quantity":"200"},
    
  // ]
  return (
    <div className="mainCompView" style={{ width: props.width, flex: props.flex }}>
      <div style={{ display: "flex" }}>
        <span style={{ fontWeight: "bold", padding: "5px", flex: "0.5" }}>Item List</span>

      </div>
      <div className="tableItemDataCard">
      {items.map((item) => {
        return (<div className="itemCard">
          <span style={{display:"flex", justifyContent:"center", fontWeight:"bold"}}> {item.name} </span>
          <span style={{display:"flex", justifyContent:"center"}}> Rs. {item.price} </span>
          <span style={{display:"flex", justifyContent:"center"}}> Availability {item.quantity > 0 ? item.quantity : "Not in Stock"} </span>


<div style={{display:"flex", marginTop:10, justifyContent:"center"}}>
          <button>EDIT</button>
          <button>DELETE</button>
          </div>
        </div>)
      })}
      </div>
    </div>
  )


  // class ListItem extends React.Component {


  // constructor() {
  //   super();
  //   this.state = {
  //     time: "",
  //     orgName: "",
  //     addItemPanel: true,
  //     message:"",
  //     number:"",
  //     item: {
  //       name: "",
  //       price: "",
  //       quantity: "",
  //     }
  //   }
  // }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       time: new Date().getDate().toFixed(0).padStart(2, '0') + "  " +
  //         new Date().toLocaleString('default', { month: 'long' }) + ", " +
  //         new Date().getFullYear().toFixed(0).padStart(2, '0') + "   " +
  //         new Date().getHours().toFixed(0).padStart(2, '0') + " : " +
  //         new Date().getMinutes().toFixed(0).padStart(2, '0') + " : " +
  //         new Date().getSeconds().toFixed(0).padStart(2, '0')
  //     })
  //   }, 1000);

  //   //
  //   // console.log("DATA", data)
  //   if (this.state.orgName === "") {
  //     this.setState({ orgName: data.name })
  //   }
  //   // this.state.orgName === "" ? this.setState({orgName: data.name}) : null
  // }

  // toggleAddEditPanel() {
  //   this.setState({
  //     addItemPanel: !this.state.addItemPanel,
  //     item: {
  //       name: "",
  //       price: "",
  //       quantity: "",
  //     }
  //   })
  // }

  // fnEditItem() {
  //   return (
  //     <div className="mainComp" style={{ width: this.props.width }}>
  //       <div style={{ display: "flex" }}>
  //         <span style={{ fontWeight: "bold", padding: "5px", flex: "0.5" }}>Edit Item</span>
  //         <span onClick={this.toggleAddEditPanel.bind(this)} style={{ fontWeight: "bold", cursor: "pointer", padding: "5px", flex: "0.5", textAlign: "right", fontWeight: "normal" }}>Add Item</span>
  //       </div>
  //       <div className="tableItemData">
  //         <div style={{ display: "flex", padding: "2px 6px" }}> <div style={{ display: "flex", flex: 0.5 }}> Item Name: </div> <div style={{ display: "flex", flex: 0.5 }}> <input /> </div> </div>
  //         <div style={{ display: "flex", padding: "2px 6px" }}> <div style={{ display: "flex", flex: 0.5 }}> Item Price: </div> <div style={{ display: "flex", flex: 0.5 }}> <input /> </div> </div>
  //         <div style={{ display: "flex", padding: "2px 6px" }}> <div style={{ display: "flex", flex: 0.5 }}> Quantity: </div> <div style={{ display: "flex", flex: 0.5 }}> <input /> </div> </div>

  //         <div style={{ display: "flex", padding: "16px 6px" }}>
  //           <button>EDIT</button>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }


  // fnAddItem() {
  //   return (
  //     <div className="mainComp" style={{ width: this.props.width }}>
  //       <div style={{ display: "flex" }}>
  //         <span style={{ fontWeight: "bold", padding: "5px", flex: "0.5" }}>Item List</span>
  //         <span onClick={this.toggleAddEditPanel.bind(this)} style={{ fontWeight: "bold", padding: "5px", cursor: "pointer", flex: "0.5", textAlign: "right", fontWeight: "normal" }}>View</span>
  //       </div>
  //       <div className="tableItemData">

  //       </div>
  //     </div>
  //   )
  // }
  // render() {
  //   return (
  //     <div style={{flex: this.props.flex}} >
  //         {/* <input
  //         id="number"
  //         placeholder="Number"
  //         value={this.state.number}
  //         onChange={e => this.setState({number:e.target.value})}
  //       />
  //       <input
  //         id="message"
  //         placeholder="Message"
  //         value={this.state.message}
  //         onChange={e => this.setState({message:e.target.value})}
  //       />
  //       <ReactWhatsapp number={this.state.number} message={this.state.message}>
  //         Open Whatsapp
  //       </ReactWhatsapp>*/}
  //         {this.fnAddItem()}
  //        {/* {this.state.addItemPanel ? this.fnAddItem() : this.fnEditItem()}  */}
  //     </div>
  //   )
  // }
}

// export default ListItem;
