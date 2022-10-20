import React, { useEffect, useState } from "react";
import { DeleteTask, editTask, getTask } from "../service/notes";
import editlogo from '../assets/edit-text.png'
import deletelogo from '../assets/trash.png'
import hidepng from '../assets/cross.png'
import { ShowAddNotes } from "../store/actions";
import NotesValue from "./inputs";
import { useSelector } from "react-redux";
import { PieChart } from 'react-minimal-pie-chart';

const Notessaver = () => {
    const current = new Date().toLocaleDateString({ weakday: Number })
    const [savedNotes, setSavedNotes] = useState([]);
    const [editNote, seteditNotes] = useState([{ notesValue: "", date: "" }]);
    const [id, setId] = useState("");
    const [show, setShow] = useState(false);
    let Value = useSelector((state) => state.dataCollection);
    let titleSearch = useSelector((state) => state.searchedData)
    console.log(savedNotes, "Value From Redux");


    const getValue = async () => {
        let data = await getTask();
        // console.log(data.data,"result")
        const reverse = data.data.reverse();
        setSavedNotes(reverse)
    }
    const closeEdit = () => {
        setShow(false)
    }

    const filterData = () => {
        console.log(titleSearch, "function filter")
        let searched = savedNotes.filter((element, index) => {
            if (element.title.toLowerCase().includes(titleSearch.toLowerCase())) {
                return element
            }
        })
        console.log(searched)
        if (searched.length > 0 && titleSearch.length != 0) {
            setSavedNotes(searched)
        }
    }

    const handleClick = (event, element) => {
        setShow(true)
        setId(element.id)
        seteditNotes({ ...editNote, notesValue: event.target.value, date: current })
        // setSavedNotes(element)
    };
    const editNotes = async () => {
        let value = await editTask(editNote, id)
        setShow(false)
        if (value.status == 201) {
            getValue()

        } else {
            // alert("Not Edited")
        }
    }
    const deleteNotes = async (id) => {
        let result = await DeleteTask(id)
        if (result.status = 201) {
            getValue()
            // alert("Value has been Deleted")
        }
    }
    useEffect(() => {
        getValue()
    }, [Value])

    useEffect(() => {
        filterData()
    }, [titleSearch])

    return (
        <div className="output-textarea-continer">
            {
                savedNotes.map((element, index) => {
                    return (

                        <div key={index} className="output-background">
                            {
                                (show) && <img className="card-image-2"
                                    onClick={closeEdit}
                                    src={hidepng} alt="" />
                            }

                            <textarea name="notes"
                                defaultValue={element.notesValue}
                                className="output-textarea"
                                placeholder={element.title}
                                onChange={(event) => handleClick(event, element)}
                                id="" cols="30" rows="10"></textarea>
                            {/* <h1 className="output-h1">{element.date}</h1> */}

                            <dir className="output-image-title">
                                <h3 className="output-title-card"><p>Title:</p>{element.title}</h3>
                                {
                                    (show == true) ? (<>
                                        <img onClick={() => editNotes(element)}
                                            height={40} width={40}
                                            className="output-image"
                                            src={editlogo} alt="" />
                                    </>) :
                                        (<img onClick={() => deleteNotes(element.id)}
                                            height={40} width={40}
                                            className="output-image"
                                            src={deletelogo} alt="" />)
                                }
                            </dir>


                        </div>
                    )
                })
            }
        </div>
    )
}
export default Notessaver;