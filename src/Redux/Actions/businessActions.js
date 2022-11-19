import {
    SAVE_USER_BUSINESS,
    LOG_OUT
} from '../Constants/businessConstants';

export const saveBusiness = (business) => async (dispatch) => {

    dispatch({
        type: SAVE_USER_BUSINESS,
        payload: business,
    });

};

export const logoutBusiness = () => async (dispatch) => {

    dispatch({
        type: LOG_OUT,
        payload: {},
    });

};