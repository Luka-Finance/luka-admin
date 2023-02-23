import React, { useState, useEffect } from 'react'
import AuxPageHead from '../../../Components/AuxPageHead/AuxPageHead'
import Layout from '../../../Components/Layout/Layout'
// import CustomSelector from '../../../Components/Common/CustomSelector/CustomSelector';
import CustomTable from '../../../Components/Common/CustomTable/CustomTable'
// import {FaRegPlusSquare} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'
import LoaderScreen from '../../../Components/Common/LoaderScreen/LoaderScreen'
import 'react-toastify/dist/ReactToastify.css'
import axiosInstance from '../../../Utils/axiosInstance'

import './Styles.css'

function Accounts() {
	const [loading, setLoading] = useState(false)
	const [accounts, setAccounts] = useState([])
	const [loaderText, setLoaderText] = useState('')
	const [filterArr, setFilterArr] = useState([])

	const getBusinesses = async () => {
		setLoaderText('fetching employees')
		setLoading(true)
		try {
			const res = await axiosInstance({
				url: '/get-businesses',
				method: 'GET',
			})
			const { data } = res.data
			setAccounts(data)
			setFilterArr(data)
			setLoading(false)
			// toast.success(message, {
			//   position: toast.POSITION.TOP_RIGHT
			// });
			// return(<ToastContainer />)
		} catch (error) {
			setLoading(false)
			console.log('err ', error)
			const err = error.response.data.message
			toast.error(err, {
				position: toast.POSITION.TOP_RIGHT,
			})
			return <ToastContainer />
		}
	}

	const searchAccount = (e) => {
		let value = e.target.value
		let arr1 = []

		accounts.forEach((cur) => {
			let name = cur.name
			if (name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
				arr1.push(cur)
			}
		})

		setFilterArr(arr1)
	}

	useEffect(() => {
		getBusinesses()
	}, [])

	if (loading) {
		return <LoaderScreen loadingText={loaderText} />
	}

	return (
		<Layout currentPage={'kyc'}>
			{/* for toast notification containing */}
			<ToastContainer />

			<AuxPageHead
				auxHeadFilter={true}
				auxBtnAppear={true}
				onAuxSearchChange={searchAccount}
			/>

			<div className='transaction-dashboard'>
				{filterArr.length < 1 ? (
					<p className='empty-state-text'>No Employee Registered yet</p>
				) : (
					<CustomTable data={filterArr} refresh={getBusinesses} />
				)}
			</div>
		</Layout>
	)
}

export default Accounts
