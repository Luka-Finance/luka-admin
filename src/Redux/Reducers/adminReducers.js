import { SAVE_ADMIN, LOG_OUT } from '../Constants/businessConstants'

export const adminReducer = (state = { admin: {} }, action) => {
	switch (action.type) {
		case SAVE_ADMIN:
			return {
				...state,
				admin: action.payload,
			}

		case LOG_OUT:
			return {}

		default:
			return state
	}
}
