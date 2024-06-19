import React, { useEffect, useState } from "react";
import './style.css';
import AddItem from "../../components/itemAdd/addItem";
import ListItem from "../../components/itemList/listItem";
import { Provider } from "react-redux";
import { store } from "../../store";
import { useNavigate, Link, Navigate } from "react-router-dom";
var data = require('../../assets/orgDetails.json');

export default function Footer(props) {
    const fnHomepage = () => {
        return (
            <div className="main" style={{
                position:"fixed",
                width:"100%",
                bottom:0
            }}>

                <div className="mainHeader">
                    <div style={{
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        display: "flex",
                        alignItems: "center"
                    }}>
                        {props.message}
                        {/* <img src={logoImgUrl} style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "20px"
                        }} />
                        <span style={{ marginLeft: "10px" }}>{orgName}</span> */}
                    </div>
                </div>
            </div>
        );
    }

    let navigate = useNavigate();

    const navigateAdminPage = () => {
        let path = "/admin"
        navigate(path)
}

const navigateWelcomePage = () => {
    let path = "/"
    navigate(path)
}

    return (
        <div>
            {fnHomepage()}
            {/* <div className="menu">
                <Link to="/Homepage">Admin</Link>
                <div className="menuList" onClick={navigateWelcomePage.bind(this)} >Home</div>
                <div className="menuList" onClick={navigateAdminPage.bind(this)} >Admin</div>
            </div> */}
        </div>
    )
}

