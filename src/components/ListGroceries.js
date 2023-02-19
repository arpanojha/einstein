import React,{Fragment, useState,useEffect} from "react";
const Listgroceries = () =>{
    const [listgro,setlistgro] = useState([]);
    
    // const delete_item =async (name) =>{
    //     try {
    //         const deleteitem = await fetch(`http://localhost:5001/remove_meal_plan/${name}`,{
    //             method: "DELETE"
    //         })
    //         console.log(deleteitem);
    //         setlistgro(listgro.filter(x=> x.name !== name))
    //         //window.location = "/";
    //     } catch (err) {
    //         console.error(err.message);
            
    //     }
    // }
    const getMP = async () => {
        try {
            const response = await fetch("http://localhost:5001/get_groceries")
            const jsonData = await response.json();
            setlistgro(jsonData)
            //console.log(jsonData);
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
            <h1 className="text-center mt-5">Groceries List</h1>
            <table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>Name</th>
       
        
      </tr>
    </thead>
    <tbody>
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {listgro.map(x => (
        <tr key = {x.groid}>
            <td>{x.name}</td>
         
            
        </tr>
      ))}
    </tbody>
  </table>
        </Fragment>
    );
};

export default Listgroceries;