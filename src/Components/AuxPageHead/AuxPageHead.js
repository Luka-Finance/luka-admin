import React from 'react';
import CustomButton from '../Common/CustomButton/Index';
import {FaRegPlusSquare} from 'react-icons/fa';

import './Styles.css'

function AuxPageHead({
    auxHeadTitle,
    auxHeadFilter,
    auxHeadBtnClick
    
}) {
  return (
    <div className='aux-head-cont'>
        {
            !auxHeadFilter ? (
                <p className='aux-head-btn-text'>
                    {auxHeadTitle}
                </p>
            ) : (
                <div>
                    filter
                </div>
            )
        }

        <div className='aux-head-btn-cont'>
            <CustomButton
                onClick={auxHeadBtnClick} 
                title={'Add new employee'}
                textColor={'#fff'}
                bgColor={'rgba(3, 166, 60, 1)'}
                disabled={false}
                icon={
                    <FaRegPlusSquare 
                        style={{
                            marginLeft: 5, 
                            color: '#fff',
                            marginTop: 6, 
                        }} 
                    />
                }
            />
        </div>
    </div>
  )
};

export default AuxPageHead;