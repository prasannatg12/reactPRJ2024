import React, { useEffect, useState } from "react";
import './style.css';
import AddItem from "../../components/itemAdd/addItem";
import ListItem from "../../components/itemList/listItem";
import { Provider } from "react-redux";
import { store } from "../../store";
import EditItem from "../../components/itemEdit/editItem";
import { Stores, getAllData } from "../../indexDB/db.ts";
var data = require('../../assets/orgDetails.json');

export default function Order() {

  const [variantName, setVariantName] = useState([]);
  const [groupedItems, setGroupedItems] = useState({});
  const [noOfTables, setNoOfTables] = useState(0);
  const [chosenTable, setChosenTable] = useState(0);
  const [reservedTable, setReservedTable] = useState([12, 5, 7])

  useEffect(() => {
    getAllDataFromDB()
    setNoOfTables(47);
  }, [])


  const getAllDataFromDB = async () => {
    let data = await getAllData(Stores.Items);
    const mappedData = data.reduce((obj, item) => (
      { ...obj, [item.variantName]: [...obj[item.variantName] ?? [], item] }
    ), {})
    setGroupedItems(mappedData)

  }

  const checkTableReserved = (c, r) => {
    for (let i = 0; i < r.length; i++) {
      console.log(">>>>", r, r[i], c)
      if (r[i] === c) {
        return true;
      }
      // return false;
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
        console.log("RESERVEDTABLE", reservedTable, count)
        if (checkTableReserved(count, reservedTable)) {
          element.push(<div className={"reservedTable"} >Table {count}</div>)
        } else {
          element.push(<div className={"eachTable"} onClick={() => setChosenTable(count)}>Table {count}</div>)
        }

      }

    }
    return <div style={{margin:"15px 0px", display: "flex", flexWrap: "wrap", justifyContent: "center", flex: 0.5, overflow: "auto", scrollbarWidth: "none", height: 500 }}>
      {element}
    </div>;
  }
  return (
<>
<div>
  <span>Dine IN</span>
  <span>Take away</span>
</div>
<div style={{ marginBottom: 32, display: "flex" }} onClick={getAllDataFromDB.bind(this)}>

      {showRestaurentTableLayout()}
      <div style={{
        display: "flex",
        flexDirection: "column",
        width:"40%"
      }}>
        <div>
          <div style={{ height: 10 }} />
          Table No. : <span style={{ fontWeight: "bold", padding: 5 }}>{chosenTable}</span>
          <div>Number of person: <input /></div>
          <div style={{ height: 10 }} />
        </div>
        <div style={{alignSelf:"flex-end", display:"flex"}}>
          Search:
        </div>
        <div>
          {groupedItems && Object.keys(groupedItems).map((key) => {
            console.log(key, groupedItems[key])
            return (
              <div style={{ border: "0px solid #aaa" }}>
                <span style={{ fontWeight: 'bold', padding:5, backgroundColor:"#00055f", color:"#fff", width:"100%", display:"flex" }}>{key}</span>
                {groupedItems[key] && groupedItems[key].map(item => {
                  return <div>{item.name}</div>
                })}
              </div>
            )

          })}
        </div>
      </div>
    </div>
    </>
  )
}

