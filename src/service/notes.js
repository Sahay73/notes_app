import axios from 'axios';

export const addTask=(add_Task)=>{
    // console.log(add_Task)
    return axios.post("http://localhost:8000/Notes",add_Task)
}
export const getTask=()=>{
    return axios.get("http://localhost:8000/Notes")
}
export const DeleteTask=(fruit_id)=>{
    return axios.delete(`http://localhost:8000/Notes/${fruit_id}`)
}
export const editTask=(fruit_deteils,fruit_id)=>{
    return axios.put(`http://localhost:8000/Notes/${fruit_id}`,fruit_deteils)
}