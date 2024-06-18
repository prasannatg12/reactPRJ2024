import React, { useState } from "react";
import './style.css';
import ReactWhatsapp from 'react-whatsapp';
import { addItem as addItemAction, searchItem } from "../../slices/itemSlice";
import { UseDispatch, useDispatch } from "react-redux";
import path from "path";

var data = require('../../assets/orgDetails.json');
export default function EditItem(){
  const  dispatch = useDispatch();
  const [searchItemText, setSearchItemText] = useState("")
  const [item,setItem] = useState({
          id: 0,
          name: "",
          price: 0,
          quantity: 0,
        });

  const fnEditItem=() =>{
    return (
      <div className="mainComp" >
        <div style={{ display: "flex" }}>
          {/* <span style={{ fontWeight: "bold", padding: "5px", flex: "0.5" }}>Edit Item</span> */}
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
          <span style={{ fontWeight: "bold", padding: "5px", flex: "0.5" }}>Edit Item</span>
          {/* <span 
          // onClick={this.toggleAddEditPanel.bind(this)} 
          style={{ fontWeight: "bold", padding: "5px", cursor: "pointer", flex: "0.5", textAlign: "right", fontWeight: "normal" }}>Edit Item</span>
  */}
        </div>
        <div className="tableItemData">
          <div style={{ display: "flex", padding: "2px 6px" }}>
            <div style={{ display: "flex", flex: 5, width:100 }}> Item Name </div>
            <div style={{ display: "flex", flex: 0 }}>
              <input onChange={(event) => {
                            {dispatch(searchItem(event.target.value))}
setSearchItemText(event.target.value)
                // setItem({
                //   // item: {
                //     ...item,
                //     name: event.target.value
                //   // }
                // })
              }} 
              value={searchItemText}
              />
            </div>
          </div>
          {/* <div style={{ display: "flex", padding: "2px 6px" }}>
            <div style={{ display: "flex", flex: 0.5 }}> Price </div>
            <div style={{ display: "flex", flex: 0.5 }}>
              <input onChange={(event) => {
                setItem({
                  ...item,
                  price: parseFloat(event.target.value)
                })
              }}
              value={item.price}
               />
            </div>
          </div>
          <div style={{ display: "flex", padding: "2px 6px" }}>
            <div style={{ display: "flex", flex: 0.5 }}> Quantity </div>
            <div style={{ display: "flex", flex: 0.5 }}>
              <input onChange={(event) => {
                setItem({
                  // item: {
                    ...item,
                    quantity: parseInt(event.target.value)
                  // }
                })
              }}
              value={item.quantity}
               />
            </div>
          </div> */}

          <div style={{ display: "flex", padding: "16px 6px" }}>
            <button onClick={() => { console.log("item", item)
          ////aaaaaa
          

          // item.id = Date.now() + Math.random()
            {dispatch(searchItem(searchItemText))}

            // console.log("Before fs")
            // const fs = require('fs');
            // // const path = require("path");
            // console.log("after fs")
            try{
              
              // const pathLocation = require("../../assets/items.json");
              // console.log(">>>>", pathLocation)
            // console.log("Before red fs")
            // const pathLocation = "../../assets/items.json"
            //   let data = fs.readFileSync(path.resolve( pathLocation))
            //   console.log("after red fs")
            //   console.log("DATAAAA", data)
  
            } catch{
              
            }
            setItem({name:"", price:0, quantity:0})
    //       const element = document.createElement("a");
    // const textFile = new Blob([JSON.stringify(this.state.item)], {type: "text/plain"}); //pass data from localStorage API to blob
    // element.href = URL.createObjectURL(textFile);
    // // element.pathname =
    // element.download =   require("../../src/item.txt");
    // document.body.appendChild(element); 
    // element.click();
          }}>Search Item</button>
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
