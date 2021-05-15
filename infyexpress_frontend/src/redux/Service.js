import { FETCH_SERVICE_FAILED, FETCH_SERVICE_RECEIVED, FETCH_SERVICE_REQUEST } from "./ActionType";

const initState = {isLoading : false, services : false, err:false};
export const Service = (state= initState,action) =>{
    switch(action.type){
        case FETCH_SERVICE_REQUEST:
            return Object.assign({},state,{isLoading:true, err:false});
        
        case FETCH_SERVICE_RECEIVED:
            
            return Object.assign({},state, {isLoading:false, err:false, services:action.services});
        
        case FETCH_SERVICE_FAILED:
            console.log("hi")
            return Object.assign({},state, {isLoading:false, err:action.err});
        
        default:
            return state;
    }
}