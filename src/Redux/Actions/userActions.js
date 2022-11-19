import {
    SAVE_USER_ACCESS_TOKEN,
} from '../Constants/userConstants';

export const saveAccessToken = (token) => async (dispatch) => {

    dispatch({
        type: SAVE_USER_ACCESS_TOKEN,
        payload: token,
    });

    localStorage.setItem('token', JSON.stringify(token));
};
