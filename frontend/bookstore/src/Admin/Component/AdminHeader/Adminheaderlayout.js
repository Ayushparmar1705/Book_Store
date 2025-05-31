import React from "react";
import Adminheader from "./Adminheader";
const Adminheaderlayout = ({children})=>{
    return (
        <>
            <Adminheader/>
            {children}
        </>
    )
}
export default Adminheaderlayout