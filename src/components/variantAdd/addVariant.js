import React, { useState } from "react";
import './style.css';
import ReactWhatsapp from 'react-whatsapp';
import { addItem as addItemAction } from "../../slices/itemSlice";
import { UseDispatch, useDispatch } from "react-redux";
import path from "path";
import { Stores, addData, getAllData } from "../../indexDB/db.ts";

var data = require('../../assets/orgDetails.json');
export default function AddVariant(){
//class AddItem extends React.Component {
  const  dispatch = useDispatch();
  const [item,setItem] = useState({
          id: 0,
          variantName: ""
        });

  const fnEditItem=() =>{
    return (
      <div className="mainComp" >
        <div style={{ display: "flex" }}>
          {/* <span style={{ fontWeight: "bold", padding: "5px", flex: "0.5" }}>Edit Item</span> */}
          <span 
          // onClick={this.toggleAddEditPanel.bind(this)}
           style={{ fontWeight: "bold", cursor: "pointer", padding: "5px", flex: "0.5", textAlign: "right", fontWeight: "normal" }}>Add Variant</span>
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
          <span style={{ fontWeight: "bold", padding: "5px", flex: "0.5" }}>Add Variant</span>
     
        </div>
        <div className="tableItemData">
          <div style={{ display: "flex", padding: "2px 6px" }}>
            <div style={{ display: "flex", flex: 5, width:100 }}> Variant Name </div>
            <div style={{ display: "flex", flex: 0 }}>
              <input onChange={(event) => {
                setItem({
                  // item: {
                    ...item,
                    variantName: event.target.value,
                    id: Date.now() + Math.random(),
                  // }
                })
              }} 
              value={item.variantName}
              />
            </div>
          </div>


          <div style={{ display: "flex", padding: "16px 6px" }}>
            <button onClick={async () => { console.log("item", item)
            try{
              let variantData = await getAllData(Stores.Variant);
              console.log("VARIANTDATA" , variantData)
              let isDataExists = false;
              variantData.map(eachData => {
                if(eachData.variantName.toString().toLowerCase() == item.variantName.toString().toLowerCase() && !isDataExists) {
                  isDataExists = true;
                } 
              })
              if(!isDataExists) {
                addData(Stores.Variant, item)  
              } else {
                alert("Variant Name Already Exists")
              }

            } catch{
              
            }
            setItem({id: 0,variantName:""})

          }}>Add</button>
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
