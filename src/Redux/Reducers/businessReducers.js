import { 
    SAVE_USER_BUSINESS,
    LOG_OUT 
} from "../Constants/businessConstants";

export const businessReducer = (state = {business: {}}, action) => {
    switch(action.type) {
        case SAVE_USER_BUSINESS:
            return {
                ...state,
                business: action.payload,
            };

        case LOG_OUT:
            return{};
        
        default:
            return state;    
    }
};