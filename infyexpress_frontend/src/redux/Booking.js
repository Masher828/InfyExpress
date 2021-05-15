import { BOOK_SERVICE_FAILED, BOOK_SERVICE_RECEIVED, BOOK_SERVICE_REQUEST, FETCH_BOOKING_REQUEST, FETCH_BOOKING_RECEIVED, FETCH_BOOKING_FAILED, CANCEL_BOOKING_REQUEST, CANCEL_BOOKING_RECEIVED, CANCEL_BOOKING_FAILED } from "./ActionType";

const initstate = {isBooking : false, isBooked : false, isError : false, isFetched:false,isFetching:false};
export const Booking = (state = initstate, action)=>{
    switch(action.type){
        case BOOK_SERVICE_REQUEST:
            return Object.assign({},state,{isBooking:true, isBooked:false,isError:false, isFetching:false,isFetched:false});
        case FETCH_BOOKING_REQUEST:
            return Object.assign({},state,{isBooking:false, isFetching:true,isFetched:false,isError:false, isBooked:false});
        case BOOK_SERVICE_RECEIVED:
            return Object.assign({},state,{isBooked:"Service Booked Successfully!!!",isBooking:false});
        case FETCH_BOOKING_RECEIVED:
            return Object.assign({},state,{isBooking:false, isFetching:false,isFetched:action.bookings,isError:false});
        case BOOK_SERVICE_FAILED:
            return Object.assign({},state,{isBooking:false,isError:action.err});
        case CANCEL_BOOKING_REQUEST:
            return Object.assign({},state,{isCancelled:false, isError : false, isCancelling : true})
        case CANCEL_BOOKING_RECEIVED:
            return Object.assign({},state,{isCancelled:true, isError:false, isCancelling:false});
        case CANCEL_BOOKING_FAILED:
            return Object.assign({},state,{isCancelling:false, isError:action.err})
        default:
            return state;
    }
}