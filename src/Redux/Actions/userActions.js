import {
    SAVE_USER_ACCESS_TOKEN,
    LOG_OUT
} from '../Constants/userConstants';

export const saveAccessToken = (token) => async (dispatch) => {

    dispatch({
        type: SAVE_USER_ACCESS_TOKEN,
        payload: token,
    });

    localStorage.setItem('token', JSON.stringify(token));
};

export const logoutUser = () => async (dispatch) => {

    dispatch({
        type: LOG_OUT,
        payload: {},
    });

};