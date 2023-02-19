import React,{Fragment, useState,useEffect} from "react";
const Listmealplan = () =>{
    const [listofmp,setlistofmp] = useState([]);
    
    const delete_item =async (name) =>{
        try {
            const deleteitem = await fetch(`http://localhost:5001/remove_meal_plan/${name}`,{
                method: "DELETE"
            })
            console.log(deleteitem);
            setlistofmp(listofmp.filter(x=> x.name !== name))
            window.location = "/";
        } catch (err) {
            console.error(err.message);
            
        }
    }
    const getMP = async () => {
        try {
            const response = await fetch("http://localhost:5001/get_meal_plans")
            const jsonData = await response.json();
            setlistofmp(jsonData)
            console.log(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }
    
    useEffect(() => {
        getMP();
       
    }, []);
    //console.log(listofstores);
    return (
        <Fragment>
            <table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>Name</th>
        <th>Recipe Name</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {listofmp.map(x => (
        <tr key = {x.mealid}>
            <td>{x.name}</td>
            <td>{x.reci_name}</td>
            <td><button className= "btn btn-danger" onClick={() => delete_item(x.name)}>Delete</button></td>
        </tr>
      ))}
    </tbody>
  </table>
        </Fragment>
    );
};

export default Listmealplan;