import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css"
export default function AxiosExercise() {

    const [JSONFile, setJSONFile] = useState({});
    useEffect(() => {
        axios.get("https://mocki.io/v1/b7383a4b-e96c-47fd-b530-52fc8be11f77").then(response => {
            setJSONFile(response.data)
        })
    })
    let { customer, availableProducts } = JSONFile;
    return (
        <>
            <div className="main">
                Customer Details:
                <div className="row">
                    <div>First Name:</div>
                    <div className="detailColumn">{customer && customer.firstName}</div>
                </div>
                <div className="row">
                    <div>Last Name:</div>
                    <div className="detailColumn">{customer && customer.lastName}</div>
                </div>
                <div className="row">
                    <div>Email:</div>
                    <div className="detailColumn">{customer && customer.email}</div>
                </div>
                <div className="row">
                    <div>Phone Number:</div>
                    <div className="detailColumn">{customer && customer.phoneNumber}</div>
                </div>
            </div>

            <div className="main">
                Available Products:
                {availableProducts && availableProducts.map(product => {
                    let { price } = product
                    return (
                        <div style={{ margin: 20 }} key={product && product.productId}>
                            <div className="row">
                                <div>Product ID:</div>
                                <div className="detailColumn">{product.productId}</div>
                            </div>
                            <div className="row">
                                <div>Name:</div>
                                <div className="detailColumn">{product.name}</div>
                            </div>
                            <div className="row">
                                <div>Display Name:</div>
                                <div className="detailColumn">{product.displayName}</div>
                            </div>
                            <div className="row">
                                <div>Product Type:</div>
                                <div className="detailColumn">{product.type}</div>
                            </div>

                            <div className="row">
                                <div>Price:</div>
                                <div className="detailColumn">{price.value + " " + price.currency} Unit: {price.unit}</div>
                            </div>

                            <div className="row">
                                <div>Description:</div>
                                <div className="detailColumn">{product.description}</div>
                            </div>
                        </div>

                    )
                })}
            </div>
        </>
    )
}