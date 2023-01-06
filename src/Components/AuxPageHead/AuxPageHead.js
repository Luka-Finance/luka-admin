import React from 'react';
import CustomButton from '../Common/CustomButton/Index';
// import {BsChevronDown} from 'react-icons/bs';

import './Styles.css'

function AuxPageHead({
    auxHeadTitle,
    auxHeadFilter,
    auxHeadBtnClick,
    auxBtnTitle,
    auxBtnIcon,
    auxBtnAppear,
    onAuxSearchChange,
}) {
  return (
    <div className='aux-head-cont'>
        {
            !auxHeadFilter ? (
                <p className='aux-head-btn-text'>
                    {auxHeadTitle}
                </p>
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
            )
        }

        {
            auxBtnAppear ? (
                <div className='aux-head-btn-cont'>
                    <CustomButton
                        btnHeight={50}
                        onClick={auxHeadBtnClick} 
                        title={auxBtnTitle}
                        textColor={'#fff'}
                        bgColor={'rgba(3, 166, 60, 1)'}
                        disabled={false}
                        icon={auxBtnIcon}
                    />
                </div>
            ) : ('')
        }
    </div>
  )
};

export default AuxPageHead;