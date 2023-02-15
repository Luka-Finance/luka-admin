import { SAVE_ADMIN, LOG_OUT } from '../Constants/businessConstants'

export const saveAdmin = (admin) => async (dispatch) => {
	dispatch({
		type: SAVE_ADMIN,
		payload: admin,
	})
}

export const logoutAdmin = () => async (dispatch) => {
	dispatch({
		type: LOG_OUT,
		payload: {},
	})
}
