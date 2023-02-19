//import e from "express";
import React,{Fragment, useState,useEffect} from "react";
import CreatableSelect from 'react-select/creatable';
import Multiselect from 'multiselect-react-dropdown';
import faster_than_light from "./faster_than_light";
const Inputrecipes = () => {
    const [name,setName] = useState("");
    var [listgrocery,setlistgrocery] = useState([])
    var [constgro,setconstgro] = useState([])
    var [grocery,setgrocery] = useState([])
    var [recilist,setrecilist] = useState([])
    var [custom_gro,setcusom_gro] = useState([])
    const [isLoading, setIsLoading] = useState(false);
   const [options, setOptions] = useState([]);
    const [value, setValue] = useState([]);
    const onsubmit = async(e) =>{
        e.preventDefault();
        try {
            grocery = constgro.map((obj) => ({"name": obj.value,"qty":1}))
            console.log(grocery)
            const body = {name,grocery}
            const response = await fetch(faster_than_light+"add_recipe",{
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
    const getgro = async () => {
        try {
            const response = await fetch(faster_than_light+"get_groceries")
            const jsonData = await response.json();
            //setlistgrocery(jsonData)
            // listgrocery = jsonData
            const monkey = jsonData.map((obj)=> ({"label":obj.name,"value": obj.name}));
            setlistgrocery(monkey)
            console.log("grocery")
            console.log(listgrocery);
        } catch (error) {
            console.log(error.message);
            
        }
    }
    useEffect(() => {
        getgro();
    }, []);
    function onSelect(selectedList, selectedItem) {
        setrecilist(selectedList);
    }
    function onRemove(selectedList, removedItem) {
        setrecilist(selectedList);
    }
    const handleCreate = async (inputValue) => {
        console.log(inputValue)
        setcusom_gro((old)=>[...old,inputValue])
//onChange={(newValue => {setcusom_gro((g)=>[...g,newValue]); console.log(newValue);console.log(custom_gro)})} onCreateOption={handleCreate}
    }
    return (

        <Fragment>
            
            <h1 className="text-center mt-5">Recipes List</h1>
            <form className="d-flex" onSubmit={onsubmit}> 
                <input type="text" className="form-control" value = {name} onChange={e=> setName(e.target.value)}/>
                <CreatableSelect isMulti options={listgrocery} onChange={(newValue) => {setconstgro(newValue)}} />
                <button className="btn btn-success">Add</button>
            </form>
            
            
            
        </Fragment>
    );
}
export default Inputrecipes;