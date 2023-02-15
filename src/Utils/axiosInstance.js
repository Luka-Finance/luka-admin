import axios from 'axios'
import accessLocalStorage from './accessLocalStorage'

const getAccessToken = () => {
	const token = accessLocalStorage.getFromLs('token')
	if (token) {
		return `Beare ${token}`
	} else {
		return ``
	}
}

// const axiosInstance = axios.create({
//   baseURL : 'https://luka-api.vercel.app',
//   headers: {
//     Authorization: getAccessToken(),
//     "Content-Type": "application/json",
//     timeout : 1000,
//   },
// });

const axiosInstance = axios.create({
	baseURL: 'https://api.luka.finance/admin',
})

axiosInstance.interceptors.request.use(
	async (config) => {
		// Do something before request is sent
		config.headers = {
			Authorization: getAccessToken(),
			'Content-Type': 'application/json',
			timeout: 1000,
		}
		return config
	},
	(error) => {
		// Do something with request error
		return Promise.reject(error)
	},
)

axiosInstance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		if (error.response.data.message === 'Token Expired') {
			console.log('sometin wrong')
			accessLocalStorage.clearLs()
			window.location.replace('/sign-in')
		} else {
			console.log('we good')
		}
		return Promise.reject(error)
	},
)

export default axiosInstance
