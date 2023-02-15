import React, { useState } from 'react'
import { Badge, Dropdown, Overlay, Table } from 'react-bootstrap'
import { BsThreeDotsVertical } from 'react-icons/bs'
// import getSymbolFromCurrency from 'currency-symbol-map';
import axiosInstance from '../../../Utils/axiosInstance'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import ListGroup from 'react-bootstrap/ListGroup'

function CustomTable({ data, refresh, setStaff, openModal }) {
	const [loading, setLoading] = useState(false)
	const [show, setShow] = useState(true)

	const businessToggle = async (id, action) => {
		setLoading(true)
		try {
			const res = await axiosInstance({
				url: `/business/kyc/toggle/${id}`,
				method: 'POST',
				data: {
					status: `${action}`,
				},
			})
			const { message } = res.data
			toast.success(message, {
				position: toast.POSITION.TOP_RIGHT,
			})
			setLoading(false)
			refresh()
			return <ToastContainer />
		} catch (error) {
			setLoading(false)
			const err = error.response.data.message
			toast.error(err, {
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
			}}>
			{children}
		</p>
	))

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'NGN',
	})

	const editStaff = (obj) => {
		setStaff({
			staffId: obj.id,
			firstName: obj.firstName,
			lastName: obj.lastName,
			phone: obj.phone,
			email: obj.email,
			salary: obj.salary,
			startDate: obj.startDate,
		})
		console.log({
			staffId: obj.id,
			firstName: obj.firstName,
			lastName: obj.lastName,
			phone: obj.phone,
			email: obj.email,
			salary: obj.salary,
			startDate: obj.startDate,
		})
		openModal()
	}

	// const popover = (
	// 	<Popover id='popover-basic'>
	// 		{/* <Popover.Header as='h3'>Popover right</Popover.Header> */}
	// 		{/* <Popover.Body> */}
	// 		<ListGroup as='ul'>
	// 			<ListGroup.Item as='li' active>
	// 				Pending
	// 			</ListGroup.Item>
	// 			<ListGroup.Item as='li'>Approved</ListGroup.Item>
	// 			<ListGroup.Item as='li' disabled>
	// 				Rejected
	// 			</ListGroup.Item>
	// 		</ListGroup>
	// 		{/* </Popover.Body> */}
	// 	</Popover>
	// )

	return (
		<>
			{loading && (
				<h5
					style={{
						textAlign: 'center',
						color: 'green',
						transition: 'ease-in-out 0.3s',
						marginBottom: 20,
					}}>
					updating ...
				</h5>
			)}
			<Table responsive={true} borderless={true}>
				<thead>
					<tr>
						{/* <th>Name</th> */}
						<th>Employee ID</th>
						<th>Company name</th>
						<th>RC/ BN Number</th>
						<th>TIN Number</th>
						<th>Email</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{data.map((cur) => (
						<tr key={cur.id}>
							<td> {cur.lukaId} </td>
							<td> {cur.name} </td>
							{/* <td>
                                {cur.id}
                            </td> */}
							<td>{cur.rcNumber || 'Null'}</td>
							<td>{cur.tin || 'Null'}</td>
							<td>
								{/* <p style={{width: 100, display: 'flex', flexWrap: 'wrap',border: '1px solid black', borderColor: 'black', borderWidth: 1, height: 60}}>
                                {cur.email}    
                                </p>  */}
								{cur.email}
							</td>
							{/* <OverlayTrigger
								trigger='click'
								placement='bottom'
								// show={show}
								overlay={popover}> */}
							<td
								style={{
									display: 'flex',
								}}>
								<p
									style={{
										fontWeight: '400',
										color:
											cur.kycStatus === 'approved'
												? '#007737'
												: cur.kycStatus === 'pending'
												? '#8B8000'
												: cur.kycStatus === 'rejected'
												? '#910202'
												: '#910202',
										backgroundColor:
											cur.kycStatus === 'approved'
												? '#E6FCEF'
												: cur.kycStatus === 'pending'
												? 'rgba(255, 255, 220, 0.5)'
												: cur.kycStatus === 'rejected'
												? '#FFECEC'
												: 'rgba(255, 236, 236, 1)',
										width: 100,
										textAlign: 'center',
										borderRadius: 3,
										padding: '2px 3px',
									}}>
									{cur.kycStatus}
								</p>

								<Dropdown
									style={{
										cursor: 'pointer',
										marginLeft: 4,
									}}>
									<Dropdown.Toggle
										as={CustomToggle}
										id='dropdown-custom-components'>
										<BsThreeDotsVertical />
									</Dropdown.Toggle>
									<div
										style={{
											position: 'absolute',
										}}>
										<Dropdown.Menu>
											<Dropdown.Item
												onClick={() => businessToggle(cur.id, 'pending')}
												style={{ color: 'rgba(255, 178, 0, 1)' }}>
												{' '}
												Pending{' '}
											</Dropdown.Item>
											<Dropdown.Item
												onClick={() => businessToggle(cur.id, 'rejected')}
												style={{ color: 'rgba(195, 0, 0, 1)' }}>
												{' '}
												Rejected{' '}
											</Dropdown.Item>
											<Dropdown.Item
												onClick={() => businessToggle(cur.id, 'approved')}
												style={{ color: 'rgba(3, 166, 60, 1)' }}>
												{' '}
												Approved{' '}
											</Dropdown.Item>
										</Dropdown.Menu>
									</div>
								</Dropdown>
							</td>
							{/* </OverlayTrigger> */}
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}

export default CustomTable
