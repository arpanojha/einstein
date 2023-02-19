//import e from "express";
import React,{Fragment, useState,useEffect} from "react";
import Dropdown from "./Dropdown";
import Multiselect from 'multiselect-react-dropdown';
import faster_than_light from "./faster_than_light"
const Inputmealplan = () => {
    const [name,setName] = useState("");
    const [listreci,setlistofreci] = useState([]);
    var [recipes,setrecipes] = useState([])
    var [recilist,setrecilist] = useState([])
    const opt = [
        {reciid:1,name:"spc"},
        {reciid:2,name:"fun"}
    ]
    const onsubmit = async(e) =>{
        e.preventDefault();
        try {
            recipes = recilist.map((obj) => ({"name": obj.name}))
            const body = {name,recipes}
            const response = await fetch(faster_than_light+"add_meal_plan",{
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
    const getReci = async () => {
        try {
            const response = await fetch(faster_than_light+"get_recipes")
            const jsonData = await response.json();
            setlistofreci(jsonData);
            //console.log(jsonData);
        } catch (error) {
            console.log(error.message);
            
        }
    }
    useEffect(() => {
        getReci();
    }, []);
    function onSelect(selectedList, selectedItem) {
        //console.log("selectedList")
        //console.log(selectedList)
        //console.log("selectedItem")
        //console.log(selectedItem)
        setrecilist(selectedList);
        //console.log(recilist[0])
    }
    function onRemove(selectedList, removedItem) {
        //console.log("selectedList")
        //console.log(selectedList)
        //onsole.log("relectedItem")
        //console.log(removedItem)
        setrecilist(selectedList);
        //console.log(recilist);
    }
    return (

        <Fragment>
            
            <h1 className="text-center mt-5">Meal Plans List</h1>
            <form className="d-flex" onSubmit={onsubmit}> 
                <input type="text" className="form-control" value = {name} onChange={e=> setName(e.target.value)}/>
                <Multiselect
                    options={listreci} // Options to display in the dropdown
                    selectedValues={recipes} // Preselected value to persist in dropdown
                    onSelect={onSelect} // Function will trigger on select event
                    onRemove={onRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    />
                <button className="btn btn-success">Add</button>
            </form>
            
        </Fragment>
    );
}
export default Inputmealplan;