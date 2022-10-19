import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addnew from '../assets/add-file.png'
import { getTask } from "../service/notes";
import { Searched, ShowAddNotes } from "../store/actions";

const Options=()=>{

    const[select,setSelect]=useState([])
    const[date,setDate]=useState([])
    const[searchValue,setSearchValue]=useState([{searchData:""}])
    const[selectedValue,setSelectedValue]=useState("")
    const dispatch=useDispatch({})
    let Value=useSelector((state)=>state.dataCollection);
    // console.log(selectedValue,"search")
    


    const getData=async()=>{
        let data=await getTask();
        let arr =[]
       data.data.filter((element)=>{

        const isDuplicate = arr.includes(element.date);

        if (!isDuplicate) {
            arr.push(element.date);
      
          return true;
        }
        return false;
       })
       setSelect(arr)
    }

    const showAddNotes=()=>{
        dispatch({type:ShowAddNotes(),payload:true});
    }

    const handleSelected=(event)=>{
        const {value}=event.target;
        setSelectedValue(value)
       }

    const handleSearch=(event)=>{
        const{value,name}=event.target;
        setSearchValue({...searchValue,[name]:value});
        dispatch({type:Searched(),payload:value});
    }

    useEffect(()=>{
        getData()
    },[Value])

    return(
        <div className="options-continer">
            <div>
            <img  className="options-image" onClick={showAddNotes}  src={addnew} alt="" />
            </div>
            <div>
            <input className="options-input"
             onChange={handleSearch} type="text"
              name="searchData" id=""
              value={searchValue.searchData}
               placeholder="SEARCH"></input>
               <select name="selectData" value={selectedValue} onChange={handleSelected} id="">
                {
                    select.map((element,index)=>{
                        return(
                            <option value={element}>{element}</option>
                        ) 
                    })
                }
               </select>
            </div>
        </div>
    )
}
export default Options;