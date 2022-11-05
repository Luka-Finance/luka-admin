import React from 'react';
import { Image } from 'react-bootstrap';
import CustomButton from '../../Components/Common/CustomButton/Index';
import Input from '../../Components/Common/Input/Input';

import './Styles.css';

function ForgotPassword() {
  return (
    <div className='parent-cont-2'>
        <div className='banner'>
            <Image src='assets/Logo.svg' alt="logo" />
        </div>

        <div className='body'>
            <div className='form-title'>
                Forgot Pasword
            </div>

            <p className='otp-entry-form-text'>
                To recover your password, please enter your email address
            </p>

            <div className='form-cont'>
                <div className='input-holder'>
                    <Input  
                        label={'Email'}
                        type={'email'}
                        onChange={(e) => {console.log(e.target.value)}}
                        error={''}
                    />
                </div>

                <div className='input-holder'>
                    <CustomButton 
                        title={'Continue'}
                        textColor={'#fff'}
                        bgColor={'#03A63C'}
                        disabledColor={'rgba(3, 166, 60, 0.5)'}
                        disabled={true}
                    />
                </div>

                <p className='otp-aux-link'>
                    Not registered? Click here to 
                    <span style={{marginLeft: 5}} className='otp-aux-link'>
                     Register
                    </span>
                </p>
            </div>
        </div>
    </div>
  );
};

export default ForgotPassword;