import React, { useEffect, useState } from "react";
import "./style.css"
import { addData, deleteByID, deleteDB, getAllData, getData, initDB, isDbExists, Stores, updateRecord } from "../indexDB/db.ts";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import { BsXCircle, BsPencil, BsListTask, BsNewspaper, BsViewList, BsTag, BsPen } from 'react-icons/bs'

export default function ToDoMain() {

    const [newTask, setNewTask] = useState("")
    const [dataSaved, setDataSaved] = useState(false)
    const [groupedItems, setGroupedItems] = useState([]);
    const [itemInDetail, setItemInDetail] = useState({});
    const [currentView, setCurrentView] = useState("StatusView");
    const [isDescriptionTextAreaDisabled, setIsDescriptionTextAreaDisabled] = useState(true)
    const [onChangeEditDescription, setOnChangeEditDescription] = useState("");
    const [countOfGroupedItems, setCountOfGroupedItems] = useState({
        total: 0,
        new: 0,
        hold: 0,
        completed: 0
    });
    const [priorityValue, setPriorityValue] = useState("");
    const [list, setList] = useState("");

    useEffect(() => {
        try {


            setDataSaved(false)

        } catch {
            console.log("ERROR")
        } finally {
            let req = isDbExists()
            console.log(":req", req, req != undefined);
            if(req.length != 0) {
                setTimeout(() => {
                    getDataFromTodoTable()
                }, 1000);
            } else {
                initializeDB()
            }
            

        }
    }, [dataSaved]);




    const getDataFromTodoTable = async () => {
        // let arrResult = await getAllData(Stores.TODO___TABLE)
        // console.log("ARRESULT", arrResult) 
        // setResultantTask(arrResult)
        let data = [], mappedData = [];
        let req = await isDbExists()
        console.log(req, ".................");
        
        if(req.length != 0) {
            data = await getAllData(Stores.TODO___TABLE);// COMMENTED NOW
        } else {
            // initializeDB()
        }

        //   data.map(eachData => {
        //     eachData.orderCount = 1;
        //     eachData.orderPrice = eachData.price;
        //   })
        console.log("DATA emptysearchterm", data)
        mappedData = data.reduce((obj, item) => (
            { ...obj, [item.status]: [...obj[item.status] ?? [], item] }
        ), {})
        console.log("mapped data", mappedData)
        console.log("mappedData", mappedData)
        setCountOfGroupedItems({
            ...countOfGroupedItems,
            total: data.length,
            new: mappedData && mappedData.NEW && mappedData.NEW.length,
            hold: mappedData && mappedData.HOLD && mappedData.HOLD.length,
            completed: mappedData && mappedData.COMPLETED && mappedData.COMPLETED.length
        })
        console.log("MAPPED DATA", mappedData)
        setGroupedItems(mappedData)
    }

    const initializeDB = async () => {
        await deleteDB();
        let dbStatus = await initDB();
        console.log("dbSTATUS", dbStatus)
    }

    const getListDB = async () => {
        const data = await getAllData(Stores.TODO__LIST_TABLE)
        console.log("DATA from list table", data)
    }

    const addListDB = async () => {
        // let dbStatus = await initDB();
        // console.log("dbSTATUS", dbStatus)
        let data = { id: Math.random(), name: list }
        await addData(Stores.TODO__LIST_TABLE, data)
        await getListDB()
    }

    const deleteTaskDB = async (item) => {
        await deleteByID(Stores.TODO___TABLE, item.id)
        getDataFromTodoTable() //////
        console.log("ITEM CLICKED", item)
    }

    const addTaskDB = async () => {
        console.log("Entered TASKS", newTask)
        if (newTask != "" || true) {
            // let dbStatus = await initDB();
            // console.log("dbSTATUS", dbStatus)
            let id = Math.random();
            let data = { id: id, taskName: newTask, status: "NEW", priority: priorityValue, description:"", taskCreateDateTime:"", taskDueDateTime:"" }
            console.log("DATA", data)

            await addData(Stores.TODO___TABLE, data)
            setDataSaved(true)
            setNewTask("")

            let collectedData = await getAllData(Stores.TODO___TABLE)
            console.log("COLLECTED DATA", collectedData)
            getDataFromTodoTable()

        }
    }

    const updateTaskDB = async (item) => {

        let itemToBeUpdated = { 
            id: item.id, 
            taskName: item.taskName,
            status: item.status, 
            priority: item.priority, 
            description: onChangeEditDescription, 
            taskCreateDateTime:"", 
            taskUpdatedDateTime: "",
            taskDueDateTime:"" }
        let updatedItem = await updateRecord(Stores.TODO___TABLE, itemToBeUpdated, item.id)
        setOnChangeEditDescription("")
        console.log("item updated", item, updatedItem)
    }

    const showItemInDetail = (item) => {
        console.log("ITEM IN DETAIL", item)
        setItemInDetail(item)
        setOnChangeEditDescription(item.description)
    }

    const displayGroupedKeyTasks = (key) => {
        return (
            <div className="panelContainer">
                <div>
                    {/* Task Status goes here */}
                    {/* {key} */}
                    <div className="panelHeader" style={{ color: "white" }}>{key}</div>

                </div>
                <div className="taskList">
                    {groupedItems[key] && groupedItems[key].map(item => {
                        return (<>
                            <div >
                                <div>
                                    <div className="taskName">
                                        <span style={{
                                            background: item.priority === "High" ? "red" :
                                                item.priority === "Medium" ? "orange" :
                                                    item.priority === "Low" ? "white" : "",
                                            width: "10px",
                                            height: "10px",
                                            marginRight: "5px"
                                        }}>&nbsp;</span>
                                        <span className="taskNameIndividual"
                                            style={item.taskName === itemInDetail.taskName ? {
                                                fontWeight: "bold",
                                                color: "#000"
                                            } : {}}
                                            onClick={showItemInDetail.bind(this, item)}
                                        >{item.taskName}</span>

                                        <span className="deleteButton"
                                            onClick={deleteTaskDB.bind(this, item)}
                                        // onClick={async () => {

                                        // }}
                                        >
                                            <span style={{ color: "lightred" }}> <BsXCircle /> </span>
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </>)
                    })}
                </div>

            </div>
        )
    }

    return (
        <>
            <div className="mainHeader">
                <div 
                onClick={
                    initializeDB.bind(this)
                }
                >To Do</div>
                {/* <div className="addButton">ADD TASK</div> */}

            </div>
            <div style={{
                display: "flex",
                flexDirection: "row"
            }} >
                <div style={{ flex: 0.2, padding: 10 }}>
                    <div className="dashboardTilesRow">
                        <div className="dashboardTiles" style={{ backgroundColor: "#aaa8" }}> Overall Tasks
                            <span style={{ fontSize: 18, fontWeight: 700 }}> <br /> {countOfGroupedItems.total} </span>
                        </div>
                        <div className="dashboardTiles" style={{ background: "#0808" }}> Completed Tasks
                            <span style={{ fontSize: 18, fontWeight: 700 }}> <br /> {countOfGroupedItems.completed} </span>
                        </div>
                    </div>
                    <div className="dashboardTilesRow">
                        <div className="dashboardTiles"> New Tasks
                            <span style={{ fontSize: 18, fontWeight: 700 }}> <br /> {countOfGroupedItems.new ? countOfGroupedItems.new : 0} </span>
                        </div>
                        <div className="dashboardTiles" style={{ background: "#a805" }}> Pending Tasks
                            <span style={{ fontSize: 18, fontWeight: 700 }}> <br /> {countOfGroupedItems.hold} </span>
                        </div>
                    </div>
                    <div className="sidePanel">
                        <span className="addButton">List</span>
                        <div>
                            <span>
                                <input className="inputAddList" value={list} onChange={async (e) => {
                                    setList(e.target.value)
                                }} /></span> &nbsp;
                            <button className="addTaskDiv" onClick={addListDB.bind(this)} > Add in List </button>
                        </div>
                    </div>

                    <div className="sidePanel">
                        <span className="addButton">Tag</span>
                        <div>
                            <span>
                                <input className="inputAddList" value={list} onChange={async (e) => {
                                    setList(e.target.value)
                                }} /></span> &nbsp;
                            <button className="addTaskDiv" onClick={addListDB.bind(this)} > Add in Tag </button>
                        </div>
                    </div>
                </div>
                <div style={{ flex: 1, color: "#fff" }}>
                    <div className="groupedAddPanel">
                        <div className="addTaskDiv" style={{ padding: "15px 10px" }}>
                            <span style={{
                                fontSize: "18px",
                                color: "#fff"
                            }}>+</span>
                            <input className="inputNewTask"
                                placeholder="Enter your task like 'Go to temple, Meet my friend tomorrow'"
                                value={newTask}
                                onKeyDown={async (e) => {
                                    console.log(">>>>>>>>>>>>", e.key);
                                    // await deleteDB()
                                    if (e.key == "Enter") {
                                        // console.log("Entered TASKS", newTask)
                                        // if (newTask != "" || true) {
                                        //     // await deleteDB()
                                        //     let dbStatus = await initDB();
                                        //     console.log("dbSTATUS", dbStatus)
                                        //     let id = Math.random();
                                        //     let data = { id: id, taskName: newTask, status: "NEW" }
                                        //     console.log("DATA", data)

                                        //     await addData(Stores.TODO___TABLE, data)
                                        //     setDataSaved(true)
                                        //     setNewTask("")

                                        //     let collectedData = await getAllData(Stores.TODO___TABLE)
                                        //     console.log("COLLECTED DATA", collectedData)

                                        // }
                                    }

                                }}
                                onChange={(e) => {
                                    setNewTask(e.target.value)
                                }
                                } />
                        </div>
                        <div className="addTaskDiv" style={{ padding: "15px" }}>
                            Set Priority &nbsp;

                            <Dropdown options={["High", "Medium", "Low"]}
                                placeholder={"Select Priority"}
                                style={{ innerWidth: "20px" }}
                                onChange={(event) => {
                                    console.log(">>>>>>>>>>>>>", event)
                                    setPriorityValue(event && event.value)

                                }}
                                value={priorityValue}
                            />

                        </div>
                        <div style={{ alignContent: "center" }} className="addTaskDiv" onClick={addTaskDB.bind(this)}> ADD </div>
                    </div>

                    {/*  */}
                    <div style={{ display: "flex", flexDirection: "row" }} >
                        <div className="taskListsContainer">
                            <div style={{ flex: 0.2 }}>
                                <div style={{ color: "#000", placeContent: "center", justifyContent: "space-evenly", alignContent: "space-evenly", display: "flex", marginTop: "10px" }}>
                                    <span
                                        style={currentView == "StatusView" ? { background: "#8885", padding:"5px 10px" } : { padding:"5px 10px"}}
                                        onClick={()=>{setCurrentView("StatusView")}}
                                        title="View task in Status View"><BsViewList /></span>
                                    <span
                                        style={currentView == "ListView" ? { background: "#8885", padding:"5px 10px" } : {padding:"5px 10px"}}
                                        onClick={()=>{setCurrentView("ListView")}}
                                        title="View task in List View"><BsListTask /></span>
                                    <span
                                        style={currentView == "TagView" ? { background: "#8885", padding:"5px 10px" } : {padding:"5px 10px"}}
                                        onClick={()=>{setCurrentView("TagView")}}
                                        title="View task in Tag View"><BsTag /></span>


                                </div>
                                {displayGroupedKeyTasks("NEW")}
                                {displayGroupedKeyTasks("HOLD")}
                                {displayGroupedKeyTasks("COMPLETED")}

                                {groupedItems && Object.keys(groupedItems).map((key) => {
                                    return (
                                        <div className="panelContainer" style={{ display: "none" }}>
                                            <div>
                                                {/* Task Status goes here */}
                                                {/* {key} */}
                                                <div className="panelHeader" style={{ color: "white" }}>{key}</div>

                                            </div>
                                            {groupedItems[key] && groupedItems[key].map(item => {
                                                return (<>
                                                    <div>
                                                        <div>
                                                            <div className="taskName">
                                                                <span style={{
                                                                    background: item.priority === "High" ? "red" :
                                                                        item.priority === "Medium" ? "orange" :
                                                                            item.priority === "Low" ? "white" : "",
                                                                    width: "10px",
                                                                    height: "10px",
                                                                    marginRight: "5px"
                                                                }}>&nbsp;</span>
                                                                {item.taskName}
                                                                <span className="deleteButton" onClick={async () => {
                                                                    await deleteByID(Stores.TODO___TABLE, item.id)
                                                                    // getDataFromTodoTable()
                                                                    console.log("ITEM CLICKED", item)
                                                                }}>
                                                                    <span style={{ color: "lightred" }}> <BsXCircle /> </span>
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </>)
                                            })}
                                        </div>
                                    )
                                })}

                            </div>

                            <div style={Object.hasOwn(itemInDetail, 'taskName') ? { flex: 0.8, background: "#2222", margin: "0px", color: "#000", padding: 15 } : { display: "none" }}>
                                <span className="itemInDetailTaskName">{itemInDetail.taskName} </span>
                                <div className="itemIndividualTitle">Description
                                    <span onClick={()=>{setIsDescriptionTextAreaDisabled(!isDescriptionTextAreaDisabled)}} style={{fontSize:"14px", float:"right"}}> &nbsp; <BsPencil /></span>
                                </div>
                                <textarea
                                onChange={(e)=>{setOnChangeEditDescription(e.target.value)}}
                                disabled={isDescriptionTextAreaDisabled}
                                value={onChangeEditDescription}
                                    style={{ width: "100%", height: "15%" }} />
                                <div className="itemIndividualTitle">
                                    Add to &nbsp;&nbsp;

                                    <Dropdown options={["High", "Medium", "Low"]}
                                        placeholder={"Choose from List"}
                                        style={{ innerWidth: "20px" }}
                                        onChange={(event) => {
                                            console.log(">>>>>>>>>>>>>", event)
                                            setPriorityValue(event && event.value)

                                        }}
                                        value={priorityValue}
                                    />
                                </div>
                                <div>
                                    <button className="btnUpdateTask" onClick={updateTaskDB.bind(this, itemInDetail)}>Update</button>
                                    <button className="btnCloseTask">Close</button>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>




            </div>



        </>
    )
}