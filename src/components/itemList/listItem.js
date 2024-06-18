import React, { useCallback, useEffect, useState } from "react";
import './style.css';
import ReactWhatsapp from 'react-whatsapp';
import { useDispatch, useSelector } from "react-redux";
import { Stores, addData, getAllData } from "../../indexDB/db.ts";
import { removeItem } from "../../slices/itemSlice.js";
// import * as fs from "fs";
// import {} from "fs-extra"
//import  * as a from 'atomically';
var data = require('../../assets/orgDetails.json');
export default function ListItem(props) {

  const  dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [itemsPreview, setItemsPreview] = useState([]);

  useEffect(()=>{
    // setInterval(() => {
      handleGetAllData()      
    // }, 100);
  }, [])

  const handleGetAllData = async () => {
    console.log("CALLED ---- ")
    const data = await getAllData(Stores.Items);
    console.log(data, "data from database ");
    setData(data);
  }
  // localStorage.removeItem("ITEMS")

  // Get all items from Local Storage
  let pathLocation = JSON.parse(localStorage.getItem("ITEMS"))

  let items = [];
  pathLocation && pathLocation.map(item => {
    items.push({ "id": Date.now() + Math.random(), "name": item.name, "price": item.price, "quantity": item.quantity })
  })

  // Get items from Store
  let itemsInStore =  useSelector((state) => (state && state.items))

  // let itemsSearched = useSelector((searchState) => {
  //   console.log("searchStatesearchStatesearchStatesearchStatesearchState", searchState)
  // })

  console.log("itemsInStoreitemsInStoreitemsInStore", itemsInStore, items)
  // Merge Local storage data and Store data
  items = [...items, ...itemsInStore]
  // setItemsPreview(items)
  
  // useEffect(()=>{
    if(items.length != (itemsPreview && itemsPreview.length)) {
      setItemsPreview(items)
      console.log("CCALLLLLLLLLLLLEEEDDDDD", items, itemsPreview)
    }
  //   console.log("================================.....", items, itemsPreview)
  // }, [])

  /**
   * 
   */
  const submitItem = async () => {
    try {
      for (let count = 0; count < items.length; count++) {
        if(items[count].id === 0) {
          items[count].id = Date.now() + Math.random()
          console.log("CALLED", items[count])
        }

        localStorage.setItem("ITEMS", JSON.stringify(items))
        await addData(Stores.Items, items[count])
      }
      setItemsPreview(null)
      localStorage.removeItem("ITEMS")
      items = items.slice(0, items.length - 1)
      console.log("ITEMSSSSSSSSSSSSSSSS", items)
      dispatch(removeItem(items))
      handleGetAllData()
    }
    catch (exc) {
      console.log("IM ON ERR", exc)
    }
  }
  return (
    <div className="mainCompView" style={{ width: props.width, flex: props.flex }}>
      <div style={{ display: "flex", placeContent:"space-between" }}>
        <span style={{ fontWeight: "bold", padding: "5px", flex: "0.5" }}>Item List (Preview)</span>
        <div id="addButton"
      style={items.length !=0 ?{display:"flex"} :{display:"none"}}
      onClick={submitItem.bind(this)} >ADD</div>

      </div>
      <div className="tableItemDataCard">
        {itemsPreview != null && itemsPreview.sort(function (a, b) {
          console.log("aaaaaaaaaaaaa",a,b )
          if(a.length!= 0 && b!= undefined){
          // if ((a && a.name != undefined && a.name.toLowerCase()) < (b && b.name != undefined && b.name.toLowerCase())) return -1;
          // if ((a && a.name != undefined && a.name.toLowerCase()) > (b && b.name != undefined && b.name.toLowerCase())) return 1;
          if ((a.name.toLowerCase()) < (b.name.toLowerCase())) return -1;
          if ((a.name.toLowerCase()) > (b.name.toLowerCase())) return 1;
          return 0;
          }
        })
          .map((item) => {
            console.log("mapped item", item, items, "---->>>>" ,itemsPreview)
            return (<div className="itemCard" key={item.name} >
              <span style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}> {item.name} </span>
              <span style={{ display: "flex", justifyContent: "center" }}> Rs. {item.price} </span>
              <span style={{ display: "flex", justifyContent: "center" }}> Availability {item.quantity > 0 ? item.quantity : "Not in Stock"} </span>
              <div style={{ display: "flex", marginTop: 10, justifyContent: "center" }}>
                <button>EDIT</button>
                <button>DELETE</button>
              </div>
            </div>)
          })}
          <div style={items.length != 0 ?{display:"none"}:{fontSize:12, display:"flex", flex:1, justifyContent:"center"}}>
            New items, that are added will be displayed here !!!
          </div>
      </div>

      <div style={{marginTop:20}}>
        <span style={{ fontWeight: "bold", padding: "5px", flex: "0.5" }}>Item List</span>
        <div className="tableItemDataCard">

        {data.sort(function (a, b) {
          if(a.length!= 0 && b!= undefined){
          // if ((a && a.name != undefined && a.name.toLowerCase()) < (b && b.name != undefined && b.name.toLowerCase())) return -1;
          // if ((a && a.name != undefined && a.name.toLowerCase()) > (b && b.name != undefined && b.name.toLowerCase())) return 1;
          if ((a.name.toLowerCase()) < (b.name.toLowerCase())) return -1;
          if ((a.name.toLowerCase()) > (b.name.toLowerCase())) return 1;
          return 0;
          }
        }).map(item => {
          return (<div className="itemCard" key={item.name} >
          <span style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}> {item.name} </span>
          <span style={{ display: "flex", justifyContent: "center" }}> Rs. {item.price} </span>
          <span style={{ display: "flex", justifyContent: "center" }}> Availability {item.quantity > 0 ? item.quantity : "Not in Stock"} </span>
          {/* <div style={{ display: "flex", marginTop: 10, justifyContent: "center" }}>
            <button>EDIT</button>
            <button>DELETE</button>
          </div> */}
        </div>)
        })}
        
      </div>
      </div>
    </div>
  )

}