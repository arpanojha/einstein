import React,{Fragment, useState,useEffect} from "react";
const Liststores = () =>{
    const [listofstores,setlistofstores] = useState([]);
    const delete_item =async (name) =>{
        try {
            const deleteitem = await fetch(`http://localhost:5001/remove_item/${name}`,{
                method: "DELETE"
            })
            //console.log(deleteitem);
            setlistofstores(listofstores.filter(x=> x.name !== name))
            //window.location = "/";
        } catch (err) {
            console.error(err.message);
            
        }
    }
    const getStores = async () => {
        try {
            const response = await fetch("http://localhost:5001/get_stores")
            const jsonData = await response.json();
            setlistofstores(jsonData)
            //console.log(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getStores();
    }, []);
    //console.log(listofstores);
    return (
        <Fragment>
            <table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>Name</th>
        
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {listofstores.map(x => (
        <tr key = {x.sid}>
            <td>{x.name}</td>
            
            <td><button className= "btn btn-danger" onClick={() => delete_item(x.name)}>Delete</button></td>
        </tr>
      ))}
    </tbody>
  </table>
        </Fragment>
    );
};

export default Liststores;