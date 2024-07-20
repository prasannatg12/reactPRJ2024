import React, { useEffect, useState } from "react";
import './style.css';
import ReactWhatsapp from 'react-whatsapp';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import { addItem as addItemAction } from "../../slices/itemSlice";
import { UseDispatch, useDispatch } from "react-redux";
import path from "path";
import { Stores, getAllData } from "../../indexDB/db.ts";

var data = require('../../assets/orgDetails.json');
export default function AddItem(){
  

  const  dispatch = useDispatch();
  const [variant, setVariant] = useState([]);
  const [item,setItem] = useState({
          id: 0,
          name: "",
          variantName: "",
          price: 0,
          quantity: 0,
          itemsInStock: 0
        });

        
  useEffect(()=>{
    getVariantData()
  }, 0)
  const getVariantData = async () => {
    let variantData = await getAllData(Stores.Variant);
    console.log("VARIANT DATA", variantData)
    let arrVariant = []
    variantData.map(each => {
      arrVariant.push(each.variantName)
    })
    setVariant(arrVariant)
  }
  
  const fnAddItem=()=> {
    return (
      <div className="mainComp">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontWeight: "bold", padding: "5px", flex: "0.5" }}>Add Item</span>
          <span style={{ padding: "5px" }} onClick={()=>getVariantData()} >Refresh</span>
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
            <div style={{ display: "flex", flex: 0.5 }}> Variant </div>
            <div style={{ display: "flex", flex: 0.85 }}>
              <Dropdown options={variant}
              placeholder={"Select Item"}
              onChange={(event)=>{
                console.log(">>>>>>>>>>>>>", event)
                setItem({
                  ...item,
                  variantName: event && event.value
                }, ()=>console.log(item, "<<<<<<<<<<<<<<<<<<"))
              }}
              value={item.variantName}
              />
              {/* <input onChange={(event) => {
                setItem({
                  ...item,
                  variantName: event.target.value
                })
              }}
              value={item.variantName}
               /> */}
            </div>
          </div>
          <div style={{ display: "flex", padding: "2px 6px" }}>
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
                    itemsInStock: parseInt(event.target.value),
                    quantity: parseInt(event.target.value)
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
          

          item.id = Date.now() + Math.random()
            {dispatch(addItemAction(item))}

            // console.log("Before fs")
            // const fs = require('fs');
            // // const path = require("path");
            // console.log("after fs")
            try{
              
              const pathLocation = require("../../assets/items.json");
              console.log(">>>>", pathLocation)
            // console.log("Before red fs")
            // const pathLocation = "../../assets/items.json"
            //   let data = fs.readFileSync(path.resolve( pathLocation))
            //   console.log("after red fs")
            //   console.log("DATAAAA", data)
  
            } catch{
              
            }
            setItem({name:"", variantName: "", price:0, quantity:0, itemsInStock: 0})
    //       const element = document.createElement("a");
    // const textFile = new Blob([JSON.stringify(this.state.item)], {type: "text/plain"}); //pass data from localStorage API to blob
    // element.href = URL.createObjectURL(textFile);
    // // element.pathname =
    // element.download =   require("../../src/item.txt");
    // document.body.appendChild(element); 
    // element.click();
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
