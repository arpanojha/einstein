import React,{Fragment, useState,useEffect} from "react";
import faster_than_light from "./faster_than_light";
const Listrecipes = () =>{
    const [listofreci,setlistofreci] = useState([]);
    var [gro_names,setgo_games] = useState({}); 
    
    const delete_item =async (name) =>{
        try {
            const del = name.reciid
            const deleteitem = await fetch(`${faster_than_light}remove_recipe/${del}`,{
                method: "DELETE"
            })
            //console.log(deleteitem);
            setlistofreci(listofreci.filter(x=> x.name !== name))
            window.location = "/";
        } catch (err) {
            console.error(err.message);
            
        }
    }
    const update =async (e,id) =>{
        try {
            console.log(e.target)
            const qty=e.target.value
            const body = {qty}
            const update = await fetch(`${faster_than_light}update_one_recipe_qty/${id.reciid}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.error("Cannot update id")
            
        }
    }
    async function gro_name (n) {
        try {
            const res = await fetch(`${faster_than_light}get_one_grocery_id/${n}`,{
                method: "GET"
            })
            const v = await res.json()
            //console.log(n)
            //console.log(v[0]["name"])
            return v[0]
        } catch (error) {
            console.error("unable to process grocery name")
           // return n
        }
    }
    const dummyvalue = async(n) => {return gro_name(n)}
    const getMP = async () => {
        try {
            const response = await fetch(faster_than_light+"get_recipes")
            const jsonData = await response.json();
            setlistofreci(jsonData)
            //console.log(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }
    const getGro = async () => {
        try {
            const response = await fetch(faster_than_light+"get_groceries")
            const jsonData = await response.json();
            const l = jsonData.length;
            var i=0;
            var gg={};
            for (i=0;i<l;i++){
                gg[jsonData[i]["groid"]] = jsonData[i]["name"]
            }
            setgo_games(gg)
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getMP();
       getGro();
       console.log("chcking")
       console.log(gro_names)
    }, []);
    //console.log(listofstores);
    return (
        <Fragment>
            <table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>Name</th>
        <th>Grocery Name</th>
        <th>Grocery qty</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {listofreci.map(x => (
        <tr key = {x.reciid}>
            <td>{x.name}</td>
            <td>{gro_names[x.groid]}</td>
            <td><input
                  name="qty"
                  type="text"
                  defaultValue={x.qty}
                  onChange={(e) => update(e, x)}
                  placeholder="Type Qty"
                /></td>
    
            <td><button className= "btn btn-danger" onClick={() => delete_item(x)}>Delete</button></td>
        </tr>
      ))}
    </tbody>
  </table>
        </Fragment>
    );
};

export default Listrecipes;