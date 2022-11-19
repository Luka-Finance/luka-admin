import {
    SAVE_USER_BUSINESS
} from '../Constants/businessConstants';

export const saveBusiness = (business) => async (dispatch) => {

    dispatch({
        type: SAVE_USER_BUSINESS,
        payload: business,
    });

};