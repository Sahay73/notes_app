import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import savelogo from '../assets/save-file.png'
import hidepng from '../assets/cross.png'
import addnew from '../assets/addnew.png'
import { addTask, getTask } from "../service/notes";
import { AddData, ShowAddNotes } from "../store/actions";
import axios from "axios";

const NotesValue=(props)=>{
    const current= new Date().toLocaleDateString({weakday:Number});
    const [myData,setMyData]=useState([]);
    const [notesValue,setNotesValue]=useState({notesValue:"",date:current,title:""});
    const [show,setShow]=useState(true);
    let value=useSelector((state)=>state.showAddNotes);
    let dispatch=useDispatch({});
    console.log(notesValue)
    // console.log(value,"Provider")


    const collectData=(event)=>{
        const{value,name}=event.target;
        setNotesValue({...notesValue,[name]:value})
    };
//     const titleValue=(event)=>{
//         const{value,name}=event.target;
//         setNotesValue({...notesValue,[name]:value})
// }
    const storeData=async()=>{
        // setMyData([...myData,notesValue])
        let result= await addTask(notesValue)
        dispatch({type:ShowAddNotes(),payload:false})
        setShow(true)
        // console.log(result.status)
        if(result.status==201){
            getResult()
        }
        else{
            // alert("hii")
        }
    };

    const hideInput=()=>{
        dispatch({type:ShowAddNotes(),payload:false})
        setShow(true)
    }
    const openNotes=()=>{
        setShow(false)
    }
    const getResult = async ()=>{
        let data=await getTask();
        // console.log(data.data,"result")
        setMyData(data.data)
        dispatch({type:AddData(),payload:data.data})
    }
    
    return(
        <div className="card-continer">
            {
            (value)&&<div>
                {
                    (show==true)?(<>
                    <div className="inputs-title-card">
                    <img className="card-close-img" onClick={hideInput} src={hidepng} alt="" />
                    <label htmlFor="title">Enter Title</label>
                    <input className="input-text-bar" 
                    onChange={collectData} 
                    placeholder="Enter a Title"
                    value={notesValue.title} 
                    name="title" type="text" id="title" />
                    <img height={40}   
                    className="input-title-image" 
                    width={40} onClick={openNotes} src={addnew}/>
                    </div>
                    </>):( <div className="inputs">
                <img className="card-image-2" onClick={hideInput} src={hidepng} alt="" />
                <textarea  name="notesValue"
                onChange={collectData} 
                maxLength={1000}
                className="input-textarea"
                placeholder="Enter-Your-Notes"
                value={notesValue.notesData} 
                cols="30" rows="10"></textarea>
                <img className="card-image" onClick={storeData} src={savelogo} alt="" />
                </div>)
                }
          </div>
          }
        </div>
    )
}
export default NotesValue;