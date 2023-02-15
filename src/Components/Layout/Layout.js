import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { AiOutlineAppstore, AiOutlineClose } from 'react-icons/ai'
import { RiNotification2Fill } from 'react-icons/ri'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { BiMenuAltRight, BiUserCircle } from 'react-icons/bi'
import { Image, Dropdown } from 'react-bootstrap'
import LoaderScreen from '../Common/LoaderScreen/LoaderScreen'
import axiosInstance from '../../Utils/axiosInstance'
import './Styles.css'
import { saveAdmin, logoutAdmin } from '../../Redux/Actions/adminActions'
import { logoutUser } from '../../Redux/Actions/userActions'
import { toast, ToastContainer } from 'react-toastify'
import accessLocalStorage from '../../Utils/accessLocalStorage'

function Layout({ children, currentPage }) {
	const dispatch = useDispatch()
	const { admin } = useSelector((state) => state.adminData)

	const [mobileNav, setMobileNav] = useState(false)
	const [show, setShow] = useState(false)
	const [loading, setLoading] = useState(false)
	const [loaderText, setLoaderText] = useState('')

	const navList = [
		'Dashboard',
		'Kyc',
		// 'Transactions',
		// 'Employees',
		// 'Payments',
		// 'Settings',
	]

	const getUserData = async () => {
		setLoaderText('fetching data')
		setLoading(true)
		try {
			const res = await axiosInstance({
				method: 'GET',
				url: '/me',
			})
			const { data, message } = res.data
			//   console.log('user data ', data)
			dispatch(saveAdmin(data))
			setLoading(false)

			//   toast.success(message, {
			//     position: toast.POSITION.TOP_RIGHT
			//   });
			//   return(<ToastContainer />)
		} catch (error) {
			setLoading(false)
			//   console.log(error);
			// const err = error.response.data.message
			toast.error('Error fetching data.', {
				position: toast.POSITION.TOP_RIGHT,
			})
			return <ToastContainer />
		}
	}

	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<p
			ref={ref}
			onClick={(e) => {
				e.preventDefault()
				onClick(e)
			}}
			style={{ marginTop: 10 }}>
			{children}
		</p>
	))

	const checkForAccessToken = () => {
		let token = accessLocalStorage.getFromLs('token')
		if (!token) {
			toast.error('Please sign in.', {
				position: toast.POSITION.TOP_RIGHT,
			})
			window.location.replace('/sign-in')
			scrubToken()
			return <ToastContainer />
		}
	}

	const userLogout = () => {
		dispatch(logoutAdmin())
		dispatch(logoutUser())
		accessLocalStorage.clearLs()
		window.location.replace('/sign-in')
	}

	const scrubToken = () => {
		dispatch(logoutAdmin())
		dispatch(logoutUser())
		accessLocalStorage.clearLs()
	}

	const checkScreenSize = () => {
		const screenWidth = window.innerWidth
		if (screenWidth < 768) {
			window.location.replace('/util-page')
		}
	}

	useEffect(() => {
		checkScreenSize()
		checkForAccessToken()

		// if (Object.keys(admin).length === 0) {
		getUserData()
		// }

		window.addEventListener('beforeunload', scrubToken)

		return () => {
			window.removeEventListener('beforeunload', scrubToken)
		}
	}, [])

	if (loading) {
		return <LoaderScreen loadingText={loaderText} />
	}
	return (
		<div className='layout-cont'>
			{/* for toast notification containing */}
			<ToastContainer />

			<div className='side-nav'>
				<div className='side-nav-logo-cont'>
					<Image
						src='assets/Logo.svg'
						alt='logo'
						className='side-nav-logo'
						width={180}
					/>
				</div>

				<div className='side-nav-link-cont'>
					{navList.map((link, index) => (
						<Link
							key={index}
							className='side-nav-link'
							style={{
								color:
									currentPage.toLowerCase() === link.toLowerCase()
										? 'rgba(3, 166, 60, 1)'
										: '#828282',
								background:
									currentPage.toLowerCase() === link.toLowerCase()
										? '#EBF8EF'
										: 'transparent',
							}}
							to={`/${link.toLowerCase()}`}>
							{link.toLowerCase() === 'dashboard' ? (
								<AiOutlineAppstore style={{ marginRight: 10, fontSize: 20 }} />
							) : link.toLowerCase() === 'kyc' ? (
								<BiUserCircle style={{ marginRight: 10, fontSize: 20 }} />
							) : (
								<div></div>
							)}
							{link}
						</Link>
					))}
				</div>
			</div>
			<div className='main-body'>
				<div className='head-nav'>
					<div className='head-nav-logo-cont'>
						<Image src='assets/Logo.svg' alt='logo' className='head-nav-logo' />
					</div>

					<div className='menu-box'>
						{/* <div className='bell-cont'>
							<div className='bell-badge'></div>
							<RiNotification2Fill style={{ fontSize: 28, color: '#C5C7CD' }} />
						</div> */}

						<div className='nav-profile'>
							<Image
								src='assets/place-holder/profile-user.svg'
								alt='profile picture'
								width={30}
							/>

							<p className='profile-name'>{admin?.name?.substring(0, 10)}</p>

							<Dropdown>
								<Dropdown.Toggle
									// onClick={() => setShow(!show)}
									as={CustomToggle}
									id='dropdown-custom-components'>
									{!show ? <BsChevronDown /> : <BsChevronUp />}
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.ItemText style={{ color: 'grey' }}>
										<strong> Profile</strong>
									</Dropdown.ItemText>
									<Dropdown.Divider />
									<Dropdown.Item as='button' onClick={userLogout}>
										Logout
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>

						<div
							className='mobile-nav-btn-cont'
							onClick={() => setMobileNav(true)}>
							<BiMenuAltRight
								style={{
									color: 'rgba(3, 166, 60, 1)',
									fontSize: 30,
								}}
							/>
						</div>
					</div>
				</div>
				<div className='children-body'>{children}</div>
			</div>
			{mobileNav && (
				<div className='mobile-nav'>
					<div className='mobile-nav-list'>
						{navList.map((link, index) => (
							<Link
								key={index}
								className='mobile-nav-link'
								style={{
									color:
										currentPage.toLowerCase() === link.toLowerCase()
											? 'rgba(3, 166, 60, 1)'
											: '#fff',
								}}
								to={`/${link.toLowerCase()}`}>
								{link}
							</Link>
						))}
					</div>

					<div
						className='mobile-nav-close-cont'
						onClick={() => setMobileNav(false)}>
						<AiOutlineClose style={{ fontSize: 30, color: '#fff' }} />
					</div>
				</div>
			)}
		</div>
	)
}

export default Layout
