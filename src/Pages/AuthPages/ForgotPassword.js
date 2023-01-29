import React, { useState, useEffect } from 'react'
import { Image } from 'react-bootstrap'
import CustomButton from '../../Components/Common/CustomButton/Index'
import Input from '../../Components/Common/Input/Input'
import axiosInstance from '../../Utils/axiosInstance'
import { toast, ToastContainer } from 'react-toastify'
import 'react-phone-input-2/lib/style.css'
import './Styles.css'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

function ForgotPassword() {
	const [form, setForm] = useState({ companyEmail: '' })
	const [errors, setErrors] = useState({})
	const [loading, setLoading] = useState(false)
	const [disable, setDisable] = useState(true)

	const onEnterValue = ({ name, value }) => {
		setForm({ ...form, [name]: value })

		if (value !== '') {
			if (name === 'companyEmail') {
				const regex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
				const isEmailValid = regex.test(value)

				if (value.length < 12 || !isEmailValid) {
					setErrors((prev) => {
						return {
							...prev,
							[name]: `Please email should be properly formated`,
						}
					})
				} else {
					setErrors((prev) => {
						return { ...prev, [name]: null }
					})
				}
			}
		} else {
			setErrors((prev) => {
				return { ...prev, [name]: `This field is required` }
			})
		}
	}

	const onSubmit = async () => {
		setLoading(true)
		try {
			const res = await axiosInstance({
				url: '/business/forget-password',
				method: 'POST',
				data: {
					email: form.companyEmail,
				},
			})
			setLoading(false)
			const { message } = res.data
			toast.success(message, {
				position: toast.POSITION.TOP_RIGHT,
			})
			// window.location.assign('/reset-password')
			return <ToastContainer />
		} catch (error) {
			setLoading(false)
			const err = error.response.data.message
			console.log('err ', err)
			toast.error(err, {
				position: toast.POSITION.TOP_RIGHT,
			})
			return <ToastContainer />
		}
	}

	useEffect(() => {
		if (form.companyEmail.length > 12) {
			setDisable(false)
		} else {
			setDisable(true)
		}
	}, [form])

	return (
		<div className='parent-cont-2'>
			{/* for toast notification containing */}
			<ToastContainer />

			<div
				className='banner'
				style={{
					position: 'absolute',
				}}>
				<Image src='assets/Logo.svg' alt='logo' width={200} />
			</div>

			<div className='body'>
				<div className='form-title'>Forgot Pasword</div>

				<p className='otp-entry-form-text'>
					To recover your password, please enter your email address
				</p>

				<div className='form-cont'>
					<div className='input-holder'>
						<Input
							label={'Email'}
							type={'email'}
							onChange={(e) => {
								const value = e.target.value
								onEnterValue({ name: 'companyEmail', value })
							}}
							error={errors.companyEmail}
						/>
					</div>

					<div className='input-holder'>
						<CustomButton
							title={'Continue'}
							textColor={'#fff'}
							bgColor={'#03A63C'}
							disabledColor={'rgba(3, 166, 60, 0.5)'}
							disabled={disable}
							onClick={onSubmit}
							icon={
								loading && (
									<Spinner
										style={{ marginTop: 5, marginLeft: 15 }}
										animation='border'
										variant='light'
									/>
								)
							}
						/>
					</div>

					<Link style={{ textDecoration: 'none' }} to={'/register'}>
						<p className='otp-aux-link-2'>
							Not registered? Click here to
							<span style={{ marginLeft: 5 }} className='otp-aux-link'>
								Register
							</span>
						</p>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ForgotPassword
