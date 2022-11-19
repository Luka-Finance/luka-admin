import {
    SAVE_USER_ACCESS_TOKEN,
    LOG_OUT,
} from '../Constants/userConstants';

export const userReducer = (state = {user: {token: ''}}, action) => {
    switch(action.type) {
        case SAVE_USER_ACCESS_TOKEN:
            return {
                ...state,
                user: {token: action.payload}
            };

        case LOG_OUT:
            return {};
        
        default:
            return state;    
    }
};