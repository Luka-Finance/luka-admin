import React from 'react'
import CustomButton from '../Common/CustomButton/Index'

import './Styles.css'

function AuxPageHead({
	auxHeadTitle,
	auxHeadFilter,
	onAuxSearchChange,
}) {
	return (
		<div className='aux-head-cont'>
			{!auxHeadFilter ? (
				<p className='aux-head-btn-text'>{auxHeadTitle}</p>
			) : (
				<div className='filter-btn-cont'>
					<p className='filter-btn-text'>Search</p>

					<div className='filter-btn-aux-cont'>
						<input
							placeholder='enter employee name'
							type={'text'}
							className='filter-search-input'
							onChange={onAuxSearchChange}
						/>
					</div>
				</div>
			)}
		</div>
	)
}

export default AuxPageHead
