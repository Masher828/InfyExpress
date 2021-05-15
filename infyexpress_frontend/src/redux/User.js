import { LOGIN_USER_FAILED, LOGIN_USER_RECEIVED, LOGIN_USER_REQUEST, ADD_USER_REQUEST, ADD_USER_RECEIVED, ADD_USER_FAILED, LOGOUT_USER_REQUEST, LOGOUT_USER_RECEIVED } from "./ActionType"

const initstate = {isAuthenticated : localStorage.getItem('token'),success:false, image:null,creds:localStorage.getItem('creds'),err:null}
export const User = (state = initstate, action)=>{
    switch (action.type){
        case LOGIN_USER_REQUEST:
            return Object.assign({},state,{isLoading : true, isAuthenticated:false,err:null});
        case LOGIN_USER_RECEIVED:
            return Object.assign({},state,{isLoading : false, isAuthenticated:true, err:null});
        case LOGIN_USER_FAILED:
            return Object.assign({},state,{isLoading : true, isAuthenticated:false, err:action.err});
        case LOGOUT_USER_REQUEST:
            return Object.assign({},state,{isLoading : true, isAuthenticated:false,err:null});
        case LOGOUT_USER_RECEIVED:
            localStorage.removeItem('creds');
            localStorage.removeItem('token');
            return Object.assign({},state,{isLoading : false, isAuthenticated:false, err:null});
        case ADD_USER_REQUEST:
            return Object.assign({},state,{isLoading:true,err:null});
        case ADD_USER_RECEIVED:
            return Object.assign({},state,{isLoading : false,  err:null,success:"Successfully Registered"});
        case ADD_USER_FAILED:
            return Object.assign({},state,{isLoading : false, err:action.err});
        default :
            return state
        

    }  
}
