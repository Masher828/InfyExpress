import { ADD_USER_FAILED, ADD_USER_RECEIVED, ADD_USER_REQUEST, FETCH_SERVICE_FAILED, FETCH_SERVICE_RECEIVED, FETCH_SERVICE_REQUEST, LOGIN_USER_FAILED, LOGIN_USER_RECEIVED, LOGIN_USER_REQUEST, LOGOUT_USER_RECEIVED, SUBMIT_QUOTE_FAILED, SUBMIT_QUOTE_RECIEVED, SUBMIT_QUOTE_REQUEST, LOGOUT_USER_REQUEST, BOOK_SERVICE_REQUEST, BOOK_SERVICE_FAILED, BOOK_SERVICE_RECEIVED, FETCH_BOOKING_RECEIVED, FETCH_BOOKING_REQUEST, FETCH_BOOKING_FAILED, CANCEL_BOOKING_REQUEST, CANCEL_BOOKING_RECEIVED, CANCEL_BOOKING_FAILED} from "./ActionType"
import Axios from 'axios';


export const loginUserRequest = ()=>{
    return{
        type : LOGIN_USER_REQUEST
    }
};

export const loginUserReceived = (details)=>{
    return {
        type : LOGIN_USER_RECEIVED,
        details
    }
};

export const loginUserFailed = (err)=>{
    return{
        type : LOGIN_USER_FAILED,
        err
    }
};

export const loginUser = (creds)=>(dispatch)=>{
    dispatch(loginUserRequest());
    fetch('http://localhost:3000/users/login',{
        method : 'POST',
        headers : {
            'Content-Type' : "application/json"
        },
        body : JSON.stringify(creds)
    })
    .then((response)=>{
        if (response.ok){
            return response;
        }
        else{
            var err= new Error(response.status);
            err.response = response;
            throw err;
        }
    })
    .then((response)=>response.json())
    .then((response)=>{
        if(response.success){
            localStorage.setItem('token',response.token);
            dispatch(loginUserReceived({token:response.token}));
        }
        else{
            dispatch(loginUserFailed({err:response.info.message}))
        }
    })
}

export const addUserRequest = ()=>{
    return{
        type : ADD_USER_REQUEST
    }
};

export const addUserReceived = (details)=>{
    return {
        type : ADD_USER_RECEIVED,
        details
    }
};

export const addUserFailed = (err)=>{
    return{
        type : ADD_USER_FAILED,
        err
    }
};

export const addUser = (data)=>(dispatch)=>{
    dispatch(addUserRequest());
    Axios.post("http://localhost:3000/users/signup",data)
    .then((response)=>{
        if(response.data.success){
            dispatch(addUserReceived());
        }
        else{
            dispatch(addUserFailed({err:response.err}))
        }
    })
    .catch((err)=>dispatch(addUserFailed(err.message)));
}

export const logoutUserRequest = ()=>{
    return{
        type : LOGOUT_USER_REQUEST
    }
};

export const logoutUserReceived = ()=>{
    return{
        type : LOGOUT_USER_RECEIVED
    }
};

export const logoutUser = ()=>(dispatch)=>{
    console.log("logging out user");
    dispatch(logoutUserRequest());
    localStorage.removeItem('token');
    fetch('http://localhost:3000/users/logout',{
        method:'GET',
        headers:{
            'Content-Type':"application/json"
        }
    },(err)=>{throw err})
    .then((response)=>response.json())
    .then(response=>{
        dispatch(logoutUserReceived());
    })
};

export const fetchServiceRequest = () =>{
    return{
        type : FETCH_SERVICE_REQUEST
    }
}

export const fetchServiceReceived = (services) =>{
    return{
        type : FETCH_SERVICE_RECEIVED,
        services: services
    }
}

export const fetchServiceFailed = (err) =>{
    return{
        type : FETCH_SERVICE_FAILED,
        err : err
    }
}

export const fetchService = ()=> (dispatch) =>{
    dispatch(fetchServiceRequest());
    Axios.get('http://localhost:3000/services')
    .then(response=>{
        if (response.data.success){
            dispatch(fetchServiceReceived(response.data.services));
        }
        else{
            
            dispatch(fetchServiceFailed({err:"err"}))
        }
    })
    .catch((err)=>dispatch(fetchServiceFailed(err)));
}

export const submitQuoteRequest = ()=>{
    return{
        type : SUBMIT_QUOTE_REQUEST
    }
}

export const submitQuoteReceived = ()=>{
    return{
        type : SUBMIT_QUOTE_RECIEVED
    }
}

export const submitQuoteFailed = (err)=>{
    return{
        type : SUBMIT_QUOTE_FAILED,
        err: err
    }
}

export const submitQuote = (data)=>(dispatch)=>{
    dispatch(submitQuoteRequest());
    console.log(data)
    Axios.post("http://localhost:3000/randomstringforadmin/addQuote",data)
    .then(response=>{
        console.log(response);
        if (response.data.success){
            dispatch(submitQuoteReceived());
        }
        else{
            dispatch(submitQuoteFailed(response.data.err));
        }
    }, (err)=>{
        console.log(err);
        dispatch(submitQuoteFailed(err));
    })
    .catch((err)=>{
        console.log(err);
        dispatch(submitQuoteFailed(err));
    })
    
}


export const bookServiceRequest = ()=>{
    return {
        type: BOOK_SERVICE_REQUEST
    }
};

export const bookServiceFailed = (err)=>{
    return{
        type : BOOK_SERVICE_FAILED,
        err:err
    }
};

export const bookServiceReceived = ()=>{
    return {
        type : BOOK_SERVICE_RECEIVED
    }
};

export const bookService = (data)=>(dispatch)=>{
    console.log(data)
    dispatch(bookServiceRequest());
    fetch('http://localhost:3000/booking',{
        method:'POST',
        headers:{
            'Content-Type':"application/json",
            'Authorization':'bearer '+localStorage.getItem('token')
        },
        body:JSON.stringify(data)
    })
    .then(response=>response.json())
    .then((response)=>{
        console.log(response);
        if (response.success){
            dispatch(bookServiceReceived());
        }
        else{
            dispatch(bookServiceFailed(response.err));
        }
        
    }, err=>{
        console.log(err);
        dispatch(bookServiceFailed(response.data.err));
    })
};

export const fetchBookingRequest =()=>{
    return{
        type : FETCH_BOOKING_REQUEST
    }
};

export const fetchBookingReceived =(bookings)=>{
    return{
        type : FETCH_BOOKING_RECEIVED,
        bookings : bookings
    }
};

export const fetchBookingFailed = (err)=>{
    return{
        type : FETCH_BOOKING_FAILED,
        err:err
    };
}

export const fetchBooking = (data)=>(dispatch)=>{
    dispatch(fetchServiceRequest());
    fetch('http://localhost:3000/booking',{
        method : 'GET',
        headers:{
            'Content-Type':"application/json",
            'Authorization': "bearer "+localStorage.getItem('token')
        }
    })
    .then((response)=>response.json())
    .then((response)=>{
        if (response.success){
            dispatch(fetchBookingReceived(response.bookings));
        }
        else{
            dispatch(fetchBookingFailed(response.err));
        }
    }, (err)=>{
        dispatch(fetchBookingFailed(err))
    })
};

export const cancelBookingRequest =()=>{
    return{
        type : CANCEL_BOOKING_REQUEST
    }
};

export const cancelBookingReceived =(bookings)=>{
    return{
        type : CANCEL_BOOKING_RECEIVED,
        bookings : bookings
    }
};

export const cancelBookingFailed = (err)=>{
    return{
        type : CANCEL_BOOKING_FAILED,
        err:err
    };
}

export const cancelBooking = (booking_id)=>(dispatch)=>{
    dispatch(cancelBookingRequest());
    console.log(booking_id);
    fetch('http://localhost:3000/booking/cancel',{
        method : 'POST',
        headers:{
            'Content-Type':"application/json",
            'Authorization': "bearer "+localStorage.getItem('token')
        },
        body:JSON.stringify({bookingId:booking_id})
    })
    .then((response)=>response.json())
    .then((response)=>{
        if (response.success){
            dispatch(cancelBookingReceived(response.bookings));
            dispatch(fetchBooking());
        }
        else{
            dispatch(cancelBookingFailed(response.err));
        }
    }, (err)=>{
        dispatch(cancelBookingFailed(err))
    })
};