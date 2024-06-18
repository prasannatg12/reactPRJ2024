import React, { useEffect, useState } from "react";
import './style.css';
import AddItem from "../../components/itemAdd/addItem";
import ListItem from "../../components/itemList/listItem";
import { Provider } from "react-redux";
import { store } from "../../store";
import { useNavigate, Link, Navigate } from "react-router-dom";
var data = require('../../assets/orgDetails.json');

export default function NavBarMain() {
    const [logoImgUrl, setLogoImgUrl] = useState("");
    const [orgName, setOrgName] = useState("");
    const [time, setTime] = useState("");
    // class Welcome extends React.Component {
    //   constructor() {
    //     super();
    //     this.state = {
    //       time: "",
    //       orgName: "",
    //       logoImgUrl: ""
    //     }
    //   }

    //   componentDidMount() {
    //     setTimeout(() => {
    //       this.setState({
    //         time: new Date().getDate().toFixed(0).padStart(2, '0') + "  " +
    //           new Date().toLocaleString('default', { month: 'long' }) + ", " +
    //           new Date().getFullYear().toFixed(0).padStart(2, '0') + "   " +
    //           new Date().getHours().toFixed(0).padStart(2, '0') + " : " +
    //           new Date().getMinutes().toFixed(0).padStart(2, '0') + " : " +
    //           new Date().getSeconds().toFixed(0).padStart(2, '0')
    //       })
    //     }, 1000);

    //     if (this.state.orgName === "") {
    //       this.setState({
    //         orgName: data.name,
    //         logoImgUrl: data.logoImgUrl
    //       })
    //     }
    //   }

    const fnCalldateTime = () => {
        // this.componentDidMount()
        return (
            <>
            <h5 style={{ paddingRight: 20 }}>{time}</h5>
            </>
        )
    }

    useEffect(() => {
        setLogoImgUrl(data.logoImgUrl)
        setOrgName(data.name)
        setTimeout(() => {
            setTime(new Date().getDate().toFixed(0).padStart(2, '0') + "  " +
                new Date().toLocaleString('default', { month: 'long' }) + ", " +
                new Date().getFullYear().toFixed(0).padStart(2, '0') + "   " +
                new Date().getHours().toFixed(0).padStart(2, '0') + " : " +
                new Date().getMinutes().toFixed(0).padStart(2, '0') + " : " +
                new Date().getSeconds().toFixed(0).padStart(2, '0'))
        }, 1000);

    })
    const fnHomepage = () => {
        return (
            <div className="main">

                <div className="mainHeader">
                    <div style={{
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <img src={logoImgUrl} style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "20px"
                        }} />
                        <span style={{ marginLeft: "10px" }}>{orgName}</span>
                    </div>
                    {fnCalldateTime()}
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
            <div className="menu">
                {/* <Link to="/Homepage">Admin</Link> */}
                <div className="menuList" onClick={navigateWelcomePage.bind(this)} >Home</div>
                <div className="menuList" onClick={navigateAdminPage.bind(this)} >Admin</div>
            </div>
        </div>
    )
}

