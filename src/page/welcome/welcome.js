import React from "react";
import './style.css';
import { deleteDB, initDB } from "../../indexDB/db.ts";


export default function WelcomePage(){

    const handleInitDB = () => {
        initDB();
    }
    const handleDeleteDB = () => {
        deleteDB();
    }
    return (
        <div>
            <h2> <center>
            Welcome Screen
            </center>

            
            </h2>
            <h5>Setup Required</h5>
            
            DataBase 
            <span className="clsInitialize" onClick={handleInitDB.bind(this)}>Initialize</span>
            <span className="clsInitialize" onClick={handleDeleteDB.bind(this)}>Delete</span>
        </div>
    )
}