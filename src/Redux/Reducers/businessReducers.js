import { SAVE_USER_BUSINESS } from "../Constants/businessConstants";

export const businessReducer = (state = {business: {}}, action) => {
    switch(action.type) {
        case SAVE_USER_BUSINESS:
            return {
                ...state,
                business: action.payload,
            };
        
        default:
            return state;    
    }
};