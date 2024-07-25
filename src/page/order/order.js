import React, { useEffect, useState } from "react";
import './style.css';
import AddItem from "../../components/itemAdd/addItem";
import ListItem from "../../components/itemList/listItem";
import { Provider } from "react-redux";
import { store } from "../../store";
import EditItem from "../../components/itemEdit/editItem";
import { Stores, addData, deleteByID, getAllData, getData, getDataByKey } from "../../indexDB/db.ts";
import Modal from 'react-modal';
var data = require('../../assets/orgDetails.json');

let prices, total;

export default function Order() {

  const [searchTerm, setSearchTerm] = useState("");
  const [groupedItems, setGroupedItems] = useState({});
  const [orderedItems, setOrderedItems] = useState([]);
  const [finalOrderedFromCart, setFinalOrderedFromCart] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [noOfTables, setNoOfTables] = useState(0);
  const [chosenTable, setChosenTable] = useState(0);
  const [reservedTable, setReservedTable] = useState([])
  const [orderType, setOrderType] = useState("Dine In");
  const [orderBy, setOrderBy] = useState("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [orderedDateTime, setOrderedDateTime] = useState("");
  const [tokenNumber, setTokenNumber] = useState("");

  useEffect(() => {
    setNoOfTables(17);
  }, [])

  useEffect(() => {
    callOnPageLoad()
  }, [], [tokenNumber])

  const callOnPageLoad = async () => {
    await getReservedTables()
    await getTokenNumber()
    await getAllDataFromDB("")
  }

  const getTokenNumber = async () => {
    let tokenNumber = await getAllData(Stores.OrderHistory)
    console.log("tokenNumber", tokenNumber)
    setTokenNumber(++tokenNumber.length);
  }

  const getReservedTables = async () => {

    let reservedData = await getAllData(Stores.Order)
    console.log("DATA from order", reservedData)
    let reserved = []
    reservedData.map(eachData => {
      reserved.push(eachData.chosenTable)
    })
    setReservedTable(reserved)
  }

  const getAllDataFromDB = async (searchTerm) => {

    console.log("SEARCHTERM", searchTerm)
    let data = [], mappedData = [];
    if (searchTerm === "") {
      data = await getAllData(Stores.Items);
      data.map(eachData => {
        eachData.orderCount = 1;
        eachData.orderPrice = eachData.price;
      })
      console.log("DATA emptysearchterm", data)
      mappedData = data.reduce((obj, item) => (
        { ...obj, [item.variantName]: [...obj[item.variantName] ?? [], item] }
      ), {})
    } else {
      data = await getData(Stores.Items, searchTerm);
      data.map(eachData => {
        eachData.orderCount = 1;
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
    for (let i = 0; i < arrItem?.length; i++) {
      if (arrItem[i].name === item) {
        return true;
      }
    }
  }

  const openReservedDetails = (tableNumber) => {
    setIsModalOpen(true)
    setChosenTable(tableNumber)
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
          element.push(<div className={"reservedTable"} onClick={() => openReservedDetails(count)} >Table {count}</div>)
        } else {
          element.push(<div className={"eachTable"} onClick={() => setChosenTable(count)}>Table {count}</div>)
        }

      }

    }
    return (
      <>
      <div style={orderBy==="token"?{padding:10}:{display:"none"}}></div>
        <div style={orderBy==="token"?{display:"none"}:{
          display: "flex",
          flexDirection: "column",
          flex: 0.75,
          scrollbarWidth: "none",
          placeContent: "center"
        }}>
          <div className="legendGrouped">
            <div className="legendRow"><div className="legendCircle" style={{ backgroundColor: "#00055f11" }}></div> <div> Available </div> </div>
            <div className="legendRow"> <div className="legendCircle" style={{ backgroundColor: "#00055f" }}></div> <div> Chosen </div> </div>
            <div className="legendRow"><div className="legendCircle" style={{ backgroundColor: "red" }}></div> <div> Ordered </div> </div>
          </div>
          <div
            style={{
              margin: "15px 0px",
              display: "flex",
              flex: "1 0 0",
              flexWrap: "wrap",
              overflow: "overlay",
              scrollbarWidth: "none"
            }}
          // style={{ margin: "15px 0px", display: "flex", flexWrap: "wrap", justifyContent: "center", flex: 0.75, overflow: "auto", scrollbarWidth: "none", height: 500 }}
          >

            {element}
          </div>
        </div>
      </>
    );
  }

  const removeFromCart = (itemToBeRemoved) => {
    let arrOrderedItems = [];
    itemToBeRemoved.orderCount = 1;
    itemToBeRemoved.orderPrice = itemToBeRemoved.price;
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
          orderPrice: (item.orderCount) * item.price
        }
        setOrderedItems(newUpdatedOrderedItem)
      }
    } else if (type === "INC") {
      if (item.orderCount + 1 < item.quantity) {
        newUpdatedOrderedItem[indexOrderedDB] = {
          ...newUpdatedOrderedItem[indexOrderedDB],
          orderCount: ++item.orderCount,
          orderPrice: (item.orderCount) * item.price
        }
        setOrderedItems(newUpdatedOrderedItem)
      } else {
        console.log("EXCEEDS")
      }
    }
  }

  const renderCartItem = (item, viewFrom) => {


    return (
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignContent: "space-evenly",
        flexWrap: "wrap",
        padding: "5px 0px",
        flex: "0.1 1 1%"
      }}>
        <div style={{ fontWeight: "bold", display: "flex", flex: 0.5 }}>{item.name}</div>
        <div style={{ display: "flex", flex: 0.25 }}>
          <div style={viewFrom === "VIEW_FROM_ORDER" ? {} : { display: "none" }} className="counterButton" onClick={() => {
            if (viewFrom === "VIEW_FROM_ORDER") {
              item = fnCounter("DEC", item)
              console.log("")
            }
          }} >-</div>
          <div><span style={viewFrom === "VIEW_FROM_ORDER" ? { display: "none" } : { paddingLeft: "5px" }}> x </span>{item.orderCount}</div>
          <div style={viewFrom === "VIEW_FROM_ORDER" ? {} : { display: "none" }} className="counterButton" onClick={() => {
            if (viewFrom === "VIEW_FROM_ORDER") {
              fnCounter("INC", item)
            }
            // console.log("INC VALUE AFTER CALL:::: ", item)
            // return item.orderCount;
          }}>+</div>
        </div>
        <div style={{ display: "flex", flex: 0.25 }}>{item.orderPrice}</div>
      </div>
    )
  }

  const getGrandTotal = (itemsOnCart) => {

    try {
      prices = itemsOnCart && itemsOnCart.map((itemOnCart) => itemOnCart.orderPrice)
      total = prices && prices.reduce((acc, curr) => acc + curr)

    }
    catch (exc) {
      total = 0;
    }
    return total;
  }

  const checkOrderType = () => {
    if (orderType === "Take Away") {
      setChosenTable(0)
    }
  }


  const orderItemFromCart = () => {
    console.log(">>>> Details <<<<<")
    checkOrderType()
    console.log("Chosen Table: ", chosenTable, " Order type: ", orderType)
    console.log("Ordered Items", orderedItems)
    setTimeout(() => {
      console.log("TOKEN NUMBER", tokenNumber)
      setGrandTotal(total)
      setFinalOrderedFromCart({
        id: orderBy === "token" ? tokenNumber : chosenTable,
        orderedItems,
        chosenTable: chosenTable,
        orderType: orderType,
        orderBy: orderBy,
        grandTotal: total,
        orderedDateTime: new Date()
      });
    }, 1000);
  }

  const saveOrder = async () => {
    await addData(Stores.Order, finalOrderedFromCart)
    await addData(Stores.OrderHistory, finalOrderedFromCart)

  }

  useEffect(() => {
    console.log("CALLED ****************", finalOrderedFromCart)
    try {
      if (finalOrderedFromCart && finalOrderedFromCart.id != null) {
        console.log("added DATA", finalOrderedFromCart)
        let reservedTab = reservedTable;
        reservedTab.push(finalOrderedFromCart.chosenTable)
        // let reserved = [...reservedTable, finalOrderedFromCart.chosenTable];

        console.log("RESERVED TABLE", reservedTable)
        getReservedTables()
        saveOrder()
        setFinalOrderedFromCart({})
        setOrderedItems([])
        setChosenTable(0)
        setOrderType("Dine In")
        setOrderBy("token")
        setReservedTable(...reservedTable, ...finalOrderedFromCart.chosenTable)
        setGrandTotal({})
        getTokenNumber()
      }
    }
    catch (exc) {
      console.log("EXCEPTION", exc)
    }
    finally {
    }
  }, [finalOrderedFromCart], [reservedTable], [tokenNumber])

  const closeModal = () => {
    setIsModalOpen(false)
    setChosenTable(0)
  }


  const orderItemFromOrderedCart = () => {
    setChosenTable(modalData && modalData.chosenTable)
    setOrderType(modalData && modalData.orderType)
    setOrderedItems(modalData && modalData.orderedItems)
    setIsModalOpen(false)
  }

  const afterOpenModal = async () => {
    console.log("chosenTable", chosenTable);
    let data = await getDataByKey(Stores.Order, chosenTable)
    console.log("DATA GOT", data)
    setModalData(data)
  }

  const setOrderFulfil = async () => {
    let data = await deleteByID(Stores.Order, modalData.chosenTable)
    console.log("AFTER DELETED", data)
    if (data === "success") {
      getReservedTables()
      closeModal()
    }
  }

  const showModalMain = () => {
    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => closeModal()}
        onAfterOpen={() => afterOpenModal()}
        contentLabel="Details"
      >
        <div className="modalHeader">
          <span>Table Number: <span style={{ fontWeight: "bold" }}>{modalData && modalData.chosenTable}</span></span>
          <span onClick={() => { closeModal() }} style={{ cursor: "pointer", color: "red" }}>&#10006;</span>
        </div>
        <div>
          <div style={{ padding: "10px 0px" }}>Order Type: <span style={{ fontWeight: "bold", padding: "5px", backgroundColor: "#00055f11", borderRadius: "8px" }}>{modalData && modalData.orderType}</span></div>
        </div>
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <div style={{ width: "30%" }}>
            <div className="cartTitle"
              style={{
                padding: "5px 10px",

                marginBottom: "10px",
                textAlign: "center",
                fontWeight: "bold"
              }}>Cart 
              {/* <span style={!modalData && modalData.orderedItems?.length ? { display: "flex" } : { display: "none" }}>(Empty)</span> */}
              </div>

            <div style={modalData && modalData.orderedItems && modalData.orderedItems.length ? { display: "flex", justifyContent: "flex-end", padding: "0px 20px", fontWeight: "500" } : { display: "none" }}>

              <span className="cartActionButton" onClick={() => orderItemFromOrderedCart(modalData)}>Update</span>
              <span style={{ background: "darkgreen", color: "#fff" }} className="cartActionButton" onClick={() => setOrderFulfil([])}>Close Order</span>
            </div>
            <div className="cartTitle" style={modalData && modalData.orderedItems && modalData.orderedItems.length ? { display: "contents" } : { display: "none" }}>
              Grand Total:  <span style={{ fontWeight: "bold" }} > Rs.&nbsp;{modalData && modalData.grandTotal} </span>
            </div>
            <div style={{ padding: "10px 0px" }}>{modalData && modalData.orderedItems && modalData.orderedItems.map(eachItem => {
              return renderCartItem(eachItem, "VIEW_FROM_HISTORY")
            })}
            </div>
          </div>
          <div style={{ width: "70%" }}>
            {/* Menu items */}


            <div className="menuItemGroupedMain" style={{ padding: "0px 10px" }}>
              {groupedItems && Object.keys(groupedItems).map((key) => {
                return (
                  <div style={{ border: "0px solid #aaa" }}>
                    <span style={{ fontWeight: 'bold', padding: 5, backgroundColor: "#00055f", backgroundImage: "linear-gradient(90deg, rgb(0,5,95), rgba(0,5,95,0.1), white)", color: "#fff", width: "100%", display: "flex" }}>{key} ({groupedItems[key].length})</span>
                    <div className="itemNameGrouped" style={{ margin: "0px 0px", display: "flex", flexWrap: "wrap", justifyContent: "flex-start", flex: "0 1 0%", overflow: "auto", scrollbarWidth: "none" }}>
                      {groupedItems[key] && groupedItems[key].map(item => {
                        return (<>
                          <div>
                            <div
                              onClick={() => removeFromCart(item)}
                              className={checkItemsOrdered(item.name, (modalData && modalData.orderedItems)) ? "closeIconItem" : "closeIconItemHide"}>&#10006;</div>
                            <div className="itemName" title={"Price: " + item.price + "\nQuantity: " + item.quantity}
                            // onClick={() => {

                            //   let newData = [...new Set(orderedItems), item];
                            // let setObj = new Set(newData.map(JSON.stringify));
                            // let finalArr = Array.from(setObj).map(JSON.parse)
                            //   // let newData = [...new Set(orderedItems), item];
                            //   setOrderedItems(finalArr)
                            // }}
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
        </div>
      </Modal>
    )
  }

  const chooseOrderTypeAndBy = () => {
    return (
      <>
      <div style={{ padding: "15px 20px", display: "flex", background:"#00055f08", margin:"-10px 0px" }}>
        {/* justifyContent:"center", alignContent:"flex-start" */}
        {/* <span>  Dine IN</span>
        <span>Take away</span> */}

<div  style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ fontWeight: "bold" }} >Order by</div>
          <div style={{ margin: "0px 10px" }}>
            <input type="radio" name="radio1" id="token" value="Token" checked={orderBy==="token"} /><label onClick={() => { 
                setOrderBy("token")                 
              }} className="token four col" for="token">Token</label>
            <input type="radio" name="radio1" id="table" value="Table" checked={orderBy==="table"}/><label onClick={() => { 
                setOrderBy("table")
                if(orderType==="Take Away") setOrderType("Dine In")
             }} className="table four col" for="table">Table</label>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ fontWeight: "bold" }} >Order type</div>
          <div style={{ margin: "0px 10px" }}>
            <input type="radio" name="radio2" id="dinein" value="Dine In" checked={orderType==="Dine In"}/><label onClick={() => {
              //  setOrderBy("table")
               setOrderType("Dine In")
                }} className="dineIn four col" for="dinein">Dine in</label>
            <input type="radio" name="radio2" id="takeaway" value="Take Away" checked={orderType==="Take Away"} /><label onClick={() => { 
              setOrderBy("token")
              setOrderType("Take Away")
               }} className="takeaway four col" for="takeaway" style={{ content: "\\2713" }}>Take away</label>
          </div>
        </div>
      </div>
      </div>
      <div  style={{ padding: "0px 10px", margin:"10px 0px", fontSize:14, color:"red", borderBottom:"1px solid #00055f" }}>
        {/* Changes will be discarded, on change of Order By */}
      </div>
      </>
    )
  }
  
  return (
    <>
      {showModalMain()}
      {chooseOrderTypeAndBy()}
      <div style={{ marginBottom: 32, display: "flex" }} >
      {/* style={orderBy === "token"? {display:"none"}:{ marginBottom: 32, display: "flex" }} */}
        {showRestaurentTableLayout()}
        <div style={orderBy==="table"?{
          display: "flex",
          flexDirection: "column",
          width: "40%"
        }:{display: "flex",
          flexDirection: "column",
          width: "50%"}}>
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
                  <div className="itemNameGrouped" style={{ margin: "0px 0px", display: "flex", flexWrap: "wrap", justifyContent: "flex-start", flex: "0 1 0%", overflow: "auto", scrollbarWidth: "none" }}>
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
        <div className="cartMain" style={orderBy==="table"?{}:{flex:1}}>
          <div >
            <div style={{ height: 10 }} />
            <span style={ { display: "flex" }}>
            {/* style={orderType === "Dine In" ? { display: "flex" } : { display: "none" }} > */}
              Table No. : <span style={{ fontWeight: "bold", padding: "0px 5px" }}>{chosenTable}</span>
            </span>
            <span>
              Token No. : {tokenNumber}
            </span>
            <div>Order Type: <span style={{ fontWeight: "bold" }}>{orderType}</span></div>
            <div style={{ height: 10 }} />
          </div>
          <div>
            <div className="cartTitle"
              style={{
                padding: "5px 10px",
                borderBottom: "1px solid #00055f99",
                marginBottom: "10px",
                textAlign: "center",
                fontWeight: "bold"
              }}>Cart <span style={!orderedItems.length ? { display: "flex" } : { display: "none" }}>(Empty)</span></div>

            <div style={orderedItems.length ? { display: "flex", justifyContent: "flex-end", padding: "0px 20px" } : { display: "none" }}>
              <span className="cartActionButton" onClick={() => setOrderedItems([])}>Clear</span>
              <span className="cartActionButton" onClick={() => orderItemFromCart()}>Order</span>
            </div>
            <div className="cartTitle" style={orderedItems.length ? { display: "contents" } : { display: "none" }}>
              Grand Total: <span style={{ fontWeight: "bold" }} > {"Rs. " + getGrandTotal(orderedItems)} </span>
            </div>
            <div style={{ padding: "10px 0px" }}>{orderedItems && orderedItems.map(eachItem => {
              return renderCartItem(eachItem, "VIEW_FROM_ORDER")
            })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

