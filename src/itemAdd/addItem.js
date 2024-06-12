import React, { useState } from "react";
import './style.css';
import ReactWhatsapp from 'react-whatsapp';
import { addItem as addItemAction } from "../slices/itemSlice";
import { UseDispatch, useDispatch } from "react-redux";



var data = require('../assets/orgDetails.json');
export default function AddItem(){
//class AddItem extends React.Component {
  const  dispatch = useDispatch();
  const [item,setItem] = useState({
          name: "",
          price: "",
          quantity: "",
        });

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

  const fnEditItem=() =>{
    return (
      <div className="mainComp" >
        <div style={{ display: "flex" }}>
          <span style={{ fontWeight: "bold", padding: "5px", flex: "0.5" }}>Edit Item</span>
          <span 
          // onClick={this.toggleAddEditPanel.bind(this)}
           style={{ fontWeight: "bold", cursor: "pointer", padding: "5px", flex: "0.5", textAlign: "right", fontWeight: "normal" }}>Add Item</span>
        </div>
        <div className="tableItemData">
          <div style={{ display: "flex", padding: "2px 6px" }}> <div style={{ display: "flex", flex: 0.5 }}> Item Name: </div> <div style={{ display: "flex", flex: 0.5 }}> <input /> </div> </div>
          <div style={{ display: "flex", padding: "2px 6px" }}> <div style={{ display: "flex", flex: 0.5 }}> Item Price: </div> <div style={{ display: "flex", flex: 0.5 }}> <input /> </div> </div>
          <div style={{ display: "flex", padding: "2px 6px" }}> <div style={{ display: "flex", flex: 0.5 }}> Quantity: </div> <div style={{ display: "flex", flex: 0.5 }}> <input /> </div> </div>

          <div style={{ display: "flex", padding: "16px 6px" }}>
            <button>EDIT</button>
          </div>
        </div>
      </div>
    )
  }


  const fnAddItem=()=> {
    return (
      <div className="mainComp">
        <div style={{ display: "flex" }}>
          <span style={{ fontWeight: "bold", padding: "5px", flex: "0.5" }}>Add Item</span>
          <span 
          // onClick={this.toggleAddEditPanel.bind(this)} 
          style={{ fontWeight: "bold", padding: "5px", cursor: "pointer", flex: "0.5", textAlign: "right", fontWeight: "normal" }}>Edit Item</span>
        </div>
        <div className="tableItemData">
          <div style={{ display: "flex", padding: "2px 6px" }}>
            <div style={{ display: "flex", flex: 0.5 }}> Item Name: </div>
            <div style={{ display: "flex", flex: 0.5 }}>
              <input onChange={(event) => {
                setItem({
                  // item: {
                    ...item,
                    name: event.target.value
                  // }
                })
              }} 
              value={item.name}
              />
            </div>
          </div>
          <div style={{ display: "flex", padding: "2px 6px" }}>
            <div style={{ display: "flex", flex: 0.5 }}> Item Price: </div>
            <div style={{ display: "flex", flex: 0.5 }}>
              <input onChange={(event) => {
                setItem({
                  // item: {
                    ...item,
                    price: event.target.value
                  // }
                })
              }}
              value={item.price}
               />
            </div>
          </div>
          <div style={{ display: "flex", padding: "2px 6px" }}>
            <div style={{ display: "flex", flex: 0.5 }}> Quantity: </div>
            <div style={{ display: "flex", flex: 0.5 }}>
              <input onChange={(event) => {
                setItem({
                  // item: {
                    ...item,
                    quantity: event.target.value
                  // }
                })
              }}
              value={item.quantity}
               />
            </div>
          </div>

          <div style={{ display: "flex", padding: "16px 6px" }}>
            <button onClick={() => { console.log("item", item)
          ////aaaaaa
          

            {dispatch(addItemAction(item))}
          
            setItem({name:"", price:"", quantity:""})
    //       const element = document.createElement("a");
    // const textFile = new Blob([JSON.stringify(this.state.item)], {type: "text/plain"}); //pass data from localStorage API to blob
    // element.href = URL.createObjectURL(textFile);
    // // element.pathname =
    // element.download =   require("../../src/item.txt");
    // document.body.appendChild(element); 
    // element.click();
          }}>ADD</button>
          </div>


        </div>
      </div>
    )
  }
  // render() {
    return (
      <div >
          {/* <input
          id="number"
          placeholder="Number"
          value={this.state.number}
          onChange={e => this.setState({number:e.target.value})}
        />
        <input
          id="message"
          placeholder="Message"
          value={this.state.message}
          onChange={e => this.setState({message:e.target.value})}
        />
        <ReactWhatsapp number={this.state.number} message={this.state.message}>
          Open Whatsapp
        </ReactWhatsapp>*/}
          {fnAddItem()}
         {/* {this.state.addItemPanel ? fnAddItem() : fnEditItem()}  */}
      </div>
    )
  }
// }

// export default AddItem;
