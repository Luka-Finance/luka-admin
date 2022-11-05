import React from 'react';
import CustomButton from '../Common/CustomButton/Index';
import {BsChevronDown} from 'react-icons/bs';

import './Styles.css'

function AuxPageHead({
    auxHeadTitle,
    auxHeadFilter,
    auxHeadBtnClick,
    auxBtnTitle,
    auxBtnIcon,
    auxBtnAppear,
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
                    <p className='filter-btn-text'>Filter</p>

                    <div className='filter-btn-aux-cont'>
                        <p>Search Employer Name</p>
                        <span style={{marginBottom: 13}}>
                            <BsChevronDown />
                        </span>
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