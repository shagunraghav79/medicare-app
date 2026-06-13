import React, { useState, useEffect } from "react";
import "./list.css";
import { toast } from "react-toastify";
import axios from "axios";

const List = () => {
    const url = "http://localhost:4000"
    const [list, setList] = React.useState([]);
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/medicine/list`);
            
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Error loading medicines");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    // remove 
    const removemedicine = async(medcineId) =>{
      const response = await axios.post(`${url}/api/medicine/remove`,{id:medcineId});
      await fetchList();
      if(response.data.success){
        toast.success(response.data.message)
      }else{
        toast.error("error")
      }
    }


    React.useEffect(() => {
        fetchList();
    }, []);

    return (
        <>
            <div className="list add flex-col">
                <p>All Medicine List</p>
                <div className="list-table">
                    <div className="list-table-format  tittle">
                        <b>Image</b>
                        <b>Name</b>
                        <b>Price</b>
                        <b>Action</b>

                    </div>
                    {list.map((item, index) => (
                       
                    <div className="list-table-format" key={index}>
                        <img src={`${url}/images/`+item.image} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <p onClick={() =>removemedicine(item._id)} className="cursor">x</p>
                    </div>
                    
                    ))}



                </div>
            </div>
        </>
    )
}

export default List;