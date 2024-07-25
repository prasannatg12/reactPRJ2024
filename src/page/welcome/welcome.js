import React, { useState } from "react";
import './style.css';
import { deleteDB, initDB } from "../../indexDB/db.ts";
import { insertQuery } from "../../utils/mysqlconnect.js";


export default function WelcomePage() {


    const [status, setStatus] = useState("");
    const handleInitDB = () => {

        let dbStatus = initDB();
        console.log("dbSTATUS", dbStatus)


        // insertQuery()
        dbStatus.then(s => {
            console.log("status iiiiiiiiiiiiiiiiiiiii", s)
            setStatus(s)
        })
        // initDB().then(dbStatus => {
        //     // console.log("DBSTATUS Creation", dbStatus)
        //     setStatus(dbStatus)
        // }).catch(error => {
        //     setStatus(error)
        // }).finally(finalStatus => {
        //     setStatus(finalStatus)
        // });
    }
    const handleDeleteDB = () => {
        deleteDB().then(dbStatus => {
            console.log("DBSTATUS", dbStatus)
            setStatus(dbStatus)
        }).catch(error => {
            console.log("ERROR", error)
        }).finally(statuss => {
            console.log("STATUS", statuss)
        });
    }
    return (
        <div>
            <h2>
                <center>
                    Welcome Screen
                </center>
            </h2>

            <div style={{margin:"0px 30px"}}>
                <h5>Setup Required</h5>

                <div className="databaseCreattionDiv">
                    <span>DataBase </span>
                    <div>
                        <span className="clsInitialize" onClick={handleInitDB.bind(this)}>Initialize</span>
                        <span className="clsInitialize" onClick={handleDeleteDB.bind(this)}>Delete</span>
                    </div>
                    <span>Status:  {status} </span>


                </div>
            </div>
        </div>
    )
}