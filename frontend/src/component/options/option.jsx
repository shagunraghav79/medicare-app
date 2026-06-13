import React from "react";
import {medtype_list} from '../../assets/assests'
import "./option.css";
const Option = ({category,setCategory}) => {  
    return (
        <>
           <div className="option">
                <h1>Explore our Medicins</h1>
                    <div className="medtype-list">
                        {medtype_list.map((item,index)=>{
                            return(
                                <div onClick={()=>setCategory(prev=>prev===item.medtype_name?"All":item.medtype_name)} key={index} className="cats">
                                    <img className={category===item.medtype_name?"active":""} src={item.medtype_img} alt="" />
                                     <h3>{item.medtype_name}</h3>
                               </div>
                           )
                     })}
                   </div>
                   <hr />
           </div>
        </>
    )
}

export default Option; 