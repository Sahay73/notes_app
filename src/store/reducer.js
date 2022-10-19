const initialState={
    showAddNotes:false,
    dataCollection:[],
    searchedData:[],
    selectData:[]
}

export const stateReducer=(state=initialState,action)=>{
console.log(action,"action-load")
    switch(action.type){
        case "SHOWNOTES":
            return{
                ...state,showAddNotes:action.payload
            }
        case "GETDATA":
            return{
                ...state,dataCollection:action.payload
            }
        case "SEARCHEDDATA":
            return{
            ...state,searchedData:action.payload
        }
            default:return state;
            break;
    }
}