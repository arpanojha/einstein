//import e from "express";
import React,{Fragment, useState} from "react";
const Inputstore = () => {
    const [name,setName] = useState("");
    const onsubmit = async(e) =>{
        e.preventDefault();
        try {
            const body = {name}
            const response = await fetch("http://localhost:5001/add_store",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            //console.log(response);
            window.location = "/";
        } catch (err) {
            console.error(err.message)
            
        }
    }
    return (
        <Fragment>
            <h1 className="text-center mt-5">Store List</h1>
            <form className="d-flex" onSubmit={onsubmit}> 
                <input type="text" className="form-control" value = {name} onChange={e=> setName(e.target.value)}/>
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
}
export default Inputstore;