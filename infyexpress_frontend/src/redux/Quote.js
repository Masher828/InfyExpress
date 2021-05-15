import { SUBMIT_QUOTE_FAILED, SUBMIT_QUOTE_RECIEVED, SUBMIT_QUOTE_REQUEST } from "./ActionType";
const initstate={isLoading:true, isSubmitted:false,isError:false};
export const Quote =(state = initstate, action)=>{
    switch(action.type){
        case SUBMIT_QUOTE_REQUEST:
            return Object.assign({},state,{isLoading:true,isError:false, isSubmitted:false})

        case SUBMIT_QUOTE_RECIEVED:
            return Object.assign({},state,{isLoading:false,isError:false, isSubmitted:"Quote Submitted InfyExpress Team will soon contact you soon"})

        case SUBMIT_QUOTE_FAILED:
            return Object.assign({},state,{isLoading:false,isError:true, isSubmitted:false})
        
        default:
            return state;
    }
}
