import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../../Components/Layout/Layout'
import AuxPageHead from '../../../Components/AuxPageHead/AuxPageHead'
import SummaryCard from '../../../Components/Common/SummaryCard/SummaryCard'
import './Styles.css'
import LoaderScreen from '../../../Components/Common/LoaderScreen/LoaderScreen'
import axiosInstance from '../../../Utils/axiosInstance'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Dashboard() {
	const adminData = useSelector((state) => state.adminData)
	const [loading, setLoading] = useState(false)
	const [loaderText, setLoaderText] = useState('')
	const [stats, setStats] = useState({
		accountsCreated: 0,
		amountPaid: 0,
		amountUnpaid: 0,
		topPerformingOrganization: 'Luka Finance',
		avgEmployeePerCompany: 0,
	})

	const { admin } = adminData

	const getBusinessStats = async () => {
		setLoaderText('Fetching stats')
		setLoading(true)
		try {
			const res = await axiosInstance({
				url: '/stats',
				method: 'GET',
			})
			const { data, message } = res.data
			setStats(data)
			// toast.success(message, {
			//   position: toast.POSITION.TOP_RIGHT
			// });
			setLoading(false)
			// return(<ToastContainer />)
		} catch (error) {
			setLoading(false)
			const err = error.response.data.message
			toast.error(err, {
				position: toast.POSITION.TOP_RIGHT,
			})
			return <ToastContainer />
		}
	}

	useEffect(() => {
		// if (Object.keys(admin).length > 0) {
		getBusinessStats()
		// }
	}, [])

	if (loading) {
		return <LoaderScreen loadingText={loaderText} />
	}

	return (
		<Layout currentPage={'dashboard'}>
			<AuxPageHead auxHeadTitle={'Overview'} auxHeadFilter={false} />

			<SummaryCard data={stats} />
		</Layout>
	)
}

export default Dashboard
