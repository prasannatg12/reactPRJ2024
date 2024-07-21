import React, { useEffect, useState } from "react";
import './style.css';
import AddItem from "../../components/itemAdd/addItem";
import ListItem from "../../components/itemList/listItem";
import { Provider } from "react-redux";
import { store } from "../../store";
import EditItem from "../../components/itemEdit/editItem";
import { Stores, getAllData, getData } from "../../indexDB/db.ts";
var data = require('../../assets/orgDetails.json');

export default function Order() {

  const [variantName, setVariantName] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupedItems, setGroupedItems] = useState({});
  const [orderedItems, setOrderedItems] = useState([]);
  const [noOfTables, setNoOfTables] = useState(0);
  const [chosenTable, setChosenTable] = useState(0);
  const [reservedTable, setReservedTable] = useState([12, 5, 7])

  useEffect(() => {
    getAllDataFromDB("")
    setNoOfTables(47);
  }, [])


  const getAllDataFromDB = async (searchTerm) => {

    let data = [], mappedData = [];

    if (searchTerm === "") {
      data = await getAllData(Stores.Items);
      data.map(eachData => {
        eachData.orderCount = 0;
        eachData.orderPrice = eachData.price;
      })
      console.log("DATA emptysearchterm", data)
      mappedData = data.reduce((obj, item) => (
        { ...obj, [item.variantName]: [...obj[item.variantName] ?? [], item] }
      ), {})
    } else {
      data = await getData(Stores.Items, searchTerm);
      data.map(eachData => {
        eachData.orderCount = 0;
        eachData.orderPrice = eachData.price;
      })
      console.log("data searched", data);
      mappedData = data.reduce((obj, item) => (
        { ...obj, [item.variantName]: [...obj[item.variantName] ?? [], item] }
      ), {})
    }
    console.log("MAPPED DATA", mappedData)
    setGroupedItems(mappedData)
  }

  const checkTableReserved = (c, r) => {
    for (let i = 0; i < r.length; i++) {
      if (r[i] === c) {
        return true;
      }
    }
  }

  const checkItemsOrdered = (item, arrItem) => {
    for (let i = 0; i < arrItem.length; i++) {
      if (arrItem[i].name === item) {
        return true;
      }
    }
  }

  const showRestaurentTableLayout = () => {
    let element = []
    for (let count = 1; count <= noOfTables; count++) {
      if (chosenTable === count) {
        element.push(<div className={"chosenTable"} onClick={() => setChosenTable(count)}>Table {count}</div>)
      } else {
        // reservedTable.map(reserved => {
        //   if(reserved === count) {
        //     element.push(<div className={"reservedTable"} onClick={()=>setChosenTable(count)}>Table {count}</div>)
        //   }           
        // })
        if (checkTableReserved(count, reservedTable)) {
          element.push(<div className={"reservedTable"} >Table {count}</div>)
        } else {
          element.push(<div className={"eachTable"} onClick={() => setChosenTable(count)}>Table {count}</div>)
        }

      }

    }
    return <div style={{ margin: "15px 0px", display: "flex", flexWrap: "wrap", justifyContent: "center", flex: 0.75, overflow: "auto", scrollbarWidth: "none", height: 500 }}>
      {element}
    </div>;
  }

  const removeFromCart = (itemToBeRemoved) => {
    let arrOrderedItems = [];
    itemToBeRemoved.orderCount = 0;
    itemToBeRemoved.orderPrice = 0;

    arrOrderedItems = orderedItems.filter((element) => element.name != itemToBeRemoved.name)
    setOrderedItems(arrOrderedItems);
  }

  const fnCounter = (type, item) => {
    let indexOrderedDB = orderedItems.findIndex(element => element.name === item.name)
    const newUpdatedOrderedItem = [...orderedItems];
    if (type === "DEC") {
      if (item.orderCount === 0) {
        removeFromCart(item)
      } else {
        newUpdatedOrderedItem[indexOrderedDB] = {
          ...newUpdatedOrderedItem[indexOrderedDB],
          orderCount: --item.orderCount,
          orderPrice: (item.orderCount + 1) * item.price
        }
        setOrderedItems(newUpdatedOrderedItem)
      }
    } else if (type === "INC") {
      if (item.orderCount + 1 < item.quantity) {
        newUpdatedOrderedItem[indexOrderedDB] = {
          ...newUpdatedOrderedItem[indexOrderedDB],
          orderCount: ++item.orderCount,
          orderPrice: (item.orderCount + 1) * item.price
        }
        setOrderedItems(newUpdatedOrderedItem)
      } else {
        console.log("EXCEEDS")
      }
    }
  }

  const renderCartItem = (item) => {

    return (
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignContent: "space-evenly",
        flexWrap: "wrap",
        padding:"5px 0px",
        flex: "0.1 1 1%"
      }}>
        <div style={{ fontWeight: "bold", display: "flex", flex: 0.5 }}>{item.name}</div>
        <div style={{ display: "flex", flex: 0.25 }}>
          <div className="counterButton" onClick={() => {
            item = fnCounter("DEC", item)
            console.log("")
          }} >-</div>
          <div>{item.orderCount + 1}</div>
          <div className="counterButton" onClick={() => {
            fnCounter("INC", item)
            // console.log("INC VALUE AFTER CALL:::: ", item)
            // return item.orderCount;
          }}>+</div>
        </div>
        <div style={{ display: "flex", flex: 0.25 }}>{item.orderPrice}</div>
      </div>
    )
  }

  const getGrandTotal = (itemsOnCart) => {
    let prices, total;
    try {
      prices = itemsOnCart && itemsOnCart.map((itemOnCart) => itemOnCart.orderPrice )
      total = prices && prices.reduce((acc, curr) => acc + curr)
  
    }
    catch(exc) {
      total = 0;
    }
    return total;
  }

  return (
    <>
      <div>
        <span>Dine IN</span>
        <span>Take away</span>
      </div>
      <div style={{ marginBottom: 32, display: "flex" }} >
        {showRestaurentTableLayout()}
        <div style={{
          display: "flex",
          flexDirection: "column",
          width: "40%"
        }}>
          <div style={{ alignSelf: "flex-end", display: "flex", marginBottom: 10 }}>
            {/* Search: */}
            <input
              placeholder="Search Items"
              onChange={(event) => {
                setSearchTerm(event.target.value)
                getAllDataFromDB(event.target.value)

              }}
              value={searchTerm}
              style={{ border: 0, borderBottom: "1px solid #555", padding: 5, flex: 1.5 }} />
          </div>
          <div className="menuItemGroupedMain">
            {groupedItems && Object.keys(groupedItems).map((key) => {
              return (
                <div style={{ border: "0px solid #aaa" }}>
                  <span style={{ fontWeight: 'bold', padding: 5, backgroundColor: "#00055f", backgroundImage: "linear-gradient(90deg, rgb(0,5,95), rgba(0,5,95,0.1), white)", color: "#fff", width: "100%", display: "flex" }}>{key} ({groupedItems[key].length})</span>
                  <div className="itemNameGrouped" style={{ margin: "15px 0px", display: "flex", flexWrap: "wrap", justifyContent: "flex-start", flex: "0 1 0%", overflow: "auto", scrollbarWidth: "none" }}>
                    {groupedItems[key] && groupedItems[key].map(item => {
                      return (<>
                        <div>
                          <div
                            onClick={() => removeFromCart(item)}
                            className={checkItemsOrdered(item.name, orderedItems) ? "closeIconItem" : "closeIconItemHide"}>&#10006;</div>
                          <div className="itemName" title={"Price: " + item.price + "\nQuantity: " + item.quantity}
                            onClick={() => {
                            
                              let newData = [...new Set(orderedItems), item];
                            let setObj = new Set(newData.map(JSON.stringify));
                            let finalArr = Array.from(setObj).map(JSON.parse)
                              // let newData = [...new Set(orderedItems), item];
                              setOrderedItems(finalArr)
                            }}
                          >
                            <span> {item.name} </span> </div>
                        </div>
                      </>)
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="cartMain">
          <div >
            <div style={{ height: 10 }} />
            Table No. : <span style={{ fontWeight: "bold", padding: 5 }}>{chosenTable}</span>
            <div>Number of person: <input /></div>
            <div style={{ height: 10 }} />
          </div>
          <div>
            <div className="cartTitle"
            style={{padding: "5px 10px",
              borderBottom: "1px solid #00055f99",
              marginBottom: "10px",
              textAlign: "center",
              fontWeight: "bold"}}>Cart <span style={!orderedItems.length ? {display:"flex"} :{display:"none"}}>(Empty)</span></div>
            
          <div style={orderedItems.length ? {display:"flex", justifyContent:"flex-end", padding:"0px 20px"} :{display:"none"}}>
            <span className="cartActionButton">Clear</span>
            <span className="cartActionButton">Order</span>
          </div>
          <div className="cartTitle" style={orderedItems.length ? {display:"contents"} :{display:"none"}}>
            Grand Total: <span style={{fontWeight:"bold"}} > {"Rs. "+ getGrandTotal(orderedItems)} </span> 
          </div>
            <div style={{padding:"10px 0px"}}>{orderedItems && orderedItems.map(eachItem => {
            return renderCartItem(eachItem)
          })}
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

