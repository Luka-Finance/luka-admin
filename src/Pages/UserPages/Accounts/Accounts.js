import React, { useState, useEffect } from 'react'
import AuxPageHead from '../../../Components/AuxPageHead/AuxPageHead'
import Layout from '../../../Components/Layout/Layout'
// import CustomSelector from '../../../Components/Common/CustomSelector/CustomSelector';
import CustomButton from '../../../Components/Common/CustomButton/Index'
import { Modal } from 'react-bootstrap'
import { InputListOne } from '../../../Components/Common/InputListOne/InputListOne'
import Input from '../../../Components/Common/Input/Input'
import CustomTable from '../../../Components/Common/CustomTable/CustomTable'
// import {FaRegPlusSquare} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'
import LoaderScreen from '../../../Components/Common/LoaderScreen/LoaderScreen'
import 'react-toastify/dist/ReactToastify.css'
import axiosInstance from '../../../Utils/axiosInstance'
import { useSelector } from 'react-redux'
import { BsCheck2 } from 'react-icons/bs'

import './Styles.css'

function Accounts() {
	const [show, setShow] = useState(false)
	const [loading, setLoading] = useState(false)
	const [accounts, setAccounts] = useState([])
	const [created, setCreated] = useState(false)
	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		salary: 0,
		startDate: '',
	})
	const [errors, setErrors] = useState({})
	const [loaderText, setLoaderText] = useState('')
	const adminData = useSelector((state) => state.adminData)
	const { admin } = adminData
	const [filterArr, setFilterArr] = useState([])
	const [disable, setDisable] = useState(true)
	const [staff, setStaff] = useState({
		staffId: '',
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		salary: 0,
		startDate: '',
	})

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const getStaffs = async () => {
		setLoaderText('fetching employees')
		setLoading(true)
		try {
			const res = await axiosInstance({
				url: '/get-businesses',
				method: 'GET',
			})
			const { data, message } = res.data
			console.log(data)
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
		getStaffs()
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
				auxHeadBtnClick={handleShow}
				auxBtnTitle={'Add new employee'}
				auxBtnAppear={true}
				onAuxSearchChange={searchAccount}
				auxBtnIcon={<></>}
			/>

			<div className='transaction-dashboard'>
				{filterArr.length < 1 ? (
					<p className='empty-state-text'>No Employee Registered yet</p>
				) : (
					<CustomTable
						data={filterArr}
						refresh={getStaffs}
						setStaff={setStaff}
						openModal={handleShow}
					/>
				)}
			</div>
		</Layout>
	)
}

export default Accounts
