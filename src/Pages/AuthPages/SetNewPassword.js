import React from 'react';
import { Image } from 'react-bootstrap';
import CustomButton from '../../Components/Common/CustomButton/Index';
import Input from '../../Components/Common/Input/Input';
import { AiFillEyeInvisible } from 'react-icons/ai';

import './Styles.css';

function SetNewPassword() {
  return (
    <div className='parent-cont-2'>
        <div className='banner'>
            <Image src='assets/Logo.svg' alt="logo" />
        </div>

        <div className='body'>
            <div className='form-title'>
                Set New Password
            </div>

            <div className='form-cont'>
                <div className='input-holder'>
                    <Input  
                        label={'New Password'}
                        type={'password'}
                        onChange={(e) => {console.log(e.target.value)}}
                        error={''}
                        icon={<AiFillEyeInvisible style={{fontSize: 20}} />}
                    />
                </div>

                <div className='input-holder'>
                    <Input  
                        label={'Confirm Password'}
                        type={'password'}
                        onChange={(e) => {console.log(e.target.value)}}
                        error={''}
                        icon={<AiFillEyeInvisible style={{fontSize: 20}} />}
                    />
                </div>

                <div className='input-holder'>
                    <CustomButton 
                        title={'Change Pasword'}
                        textColor={'#fff'}
                        bgColor={'#03A63C'}
                        disabledColor={'rgba(3, 166, 60, 0.5)'}
                        disabled={true}
                    />
                </div>
            </div>
        </div>
    </div>
  );
};

export default SetNewPassword;