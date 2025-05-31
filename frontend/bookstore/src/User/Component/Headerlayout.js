import React from "react";
import Header from "./Header";
const Headerlayout = ({children})=>{
    return (
        <>
            <Header data = "Bookstore"/>
            {children}
        </>
    )
}
export default Headerlayout