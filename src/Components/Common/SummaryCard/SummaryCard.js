import React from 'react'
import { BiWallet, BiNote } from 'react-icons/bi'
import { BsCheckLg, BsExclamationSquare } from 'react-icons/bs'
import { HiUsers } from 'react-icons/hi'
import { TbBuildingBank } from 'react-icons/tb'
import getSymbolFromCurrency from 'currency-symbol-map'

import './Styles.css'

function SummaryCard({ data }) {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'NGN',
	})

	return (
		<div className='dashboard-card-cont'>
			<div className='dashboard-card' style={{ margin: '0px 20px 20px 0px' }}>
				<div className='dashboard-card-head'>
					<p className='dashboard-card-text-2'>Accounts Created</p>
					<p
						className='dashboard-card-icon-cont'
						style={{ backgroundColor: 'rgba(3, 166, 60, 0.1)' }}>
						<BiNote style={{ fontSize: 20, color: '#03A63C' }} />
					</p>
				</div>
				<p className='dashboard-card-text' style={{ color: '#000' }}>
					{/* <span
							style={{
								marginRight: 5,
								fontFamily: 'DM Sans',
							}}>
							{getSymbolFromCurrency('NGN')}
						</span> */}
					<span>
						{data.accountsCreated}
						{/* {data.totalEarnedThisMonth
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} */}
					</span>
				</p>
			</div>

			<div className='dashboard-card' style={{ margin: '0px 20px 20px 0px' }}>
				<div className='dashboard-card-head'>
					<p className='dashboard-card-text-2'>Amount paid</p>
					<p
						className='dashboard-card-icon-cont'
						style={{ backgroundColor: 'rgba(3, 166, 60, 0.1)' }}>
						<BiWallet style={{ fontSize: 20, color: '#03A63C' }} />
					</p>
				</div>
				<p className='dashboard-card-text' style={{ color: '#000' }}>
					{/* <span style={{ marginRight: 5 }}>
							{getSymbolFromCurrency('NGN')}
						</span> */}
					<span>
						{formatter.format(data.amountPaid)}
						{/* {data.totalWithdrawn
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} */}
					</span>
				</p>
			</div>
			<div className='dashboard-card' style={{ margin: '0px 20px 20px 0px' }}>
				<div className='dashboard-card-head'>
					<p className='dashboard-card-text-2'>Amount unpaid</p>
					<p
						className='dashboard-card-icon-cont'
						style={{ backgroundColor: 'rgba(3, 166, 60, 0.1)' }}>
						<BiWallet style={{ fontSize: 20, color: '#03A63C' }} />
					</p>
				</div>
				<p className='dashboard-card-text' style={{ color: '#000' }}>
					{/* <span style={{ marginRight: 5 }}>
							{getSymbolFromCurrency('NGN')}
						</span> */}
					<span
						style={{
							color: 'red',
						}}>
						{formatter.format(data.amountUnpaid)}
						{/* {data.totalWithdrawn
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} */}
					</span>
				</p>
			</div>
			<div className='dashboard-card' style={{ margin: '0px 20px 20px 0px' }}>
				<div className='dashboard-card-head'>
					<p className='dashboard-card-text-2'>Top Performing Organisation</p>
					<p
						className='dashboard-card-icon-cont'
						style={{ backgroundColor: 'rgba(3, 166, 60, 0.1)' }}>
						<TbBuildingBank style={{ fontSize: 20, color: '#03A63C' }} />
					</p>
				</div>
				<p className='dashboard-card-text' style={{ color: '#000' }}>
					{/* <span style={{ marginRight: 5 }}>
							{getSymbolFromCurrency('NGN')}
						</span> */}
					<span>{data.topPerformingOrganization}</span>
				</p>
			</div>
			<div className='dashboard-card' style={{ margin: '0px 20px 20px 0px' }}>
				<div className='dashboard-card-head'>
					<p className='dashboard-card-text-2'>Avg. employee per company</p>
					<p
						className='dashboard-card-icon-cont'
						style={{ backgroundColor: 'rgba(3, 166, 60, 0.1)' }}>
						<HiUsers style={{ fontSize: 20, color: '#03A63C' }} />
					</p>
				</div>
				<p className='dashboard-card-text' style={{ color: '#000' }}>
					{/* <span style={{ marginRight: 5 }}>
							{getSymbolFromCurrency('NGN')}
						</span> */}
					<span>
						{data.avgEmployeePerCompany}
						{/* {data.totalWithdrawn
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} */}
					</span>
				</p>
			</div>
		</div>
	)
}

export default SummaryCard
