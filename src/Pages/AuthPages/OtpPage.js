import React from 'react';
import { Image } from 'react-bootstrap';
import CustomButton from '../../Components/Common/CustomButton/Index';

import './Styles.css';

function OtpPage() {
  return (
    <div className='parent-cont-2'>
        <div className='banner'>
            <Image src='assets/Logo.svg' alt="logo" />
        </div>

        <div className='body'>
            <p className='form-title-1'>
                Enter OTP
            </p>

            <p className='otp-entry-form-text'>
                A one-time password have been sent to your registered email
                kindly input the 6-digit code below
            </p>


            <div className='form-cont'>
                <div className='otp-input-cont'>
                    <input 
                        type={'text'} 
                        className='otp-input' 
                        maxLength={1}
                    />
                    <input 
                        type={'text'} 
                        className='otp-input'
                        maxLength={1} 
                    />
                    <input 
                        type={'text'} 
                        className='otp-input' 
                    />
                    <input 
                        type={'text'} 
                        className='otp-input' 
                        maxLength={1}
                    />
                    <input 
                        type={'text'} 
                        className='otp-input' 
                        maxLength={1}
                    />
                    <input 
                        type={'text'} 
                        className='otp-input' 
                        maxLength={1}
                    />
                </div>

                <div className='input-holder-1'>
                    <CustomButton 
                        title={'Continue'}
                        textColor={'#fff'}
                        bgColor={'#03A63C'}
                        disabledColor={'rgba(3, 166, 60, 0.5)'}
                        disabled={true}
                    />
                </div>

                <p className='otp-aux-link'>
                    Didn't get the email? 
                    <span style={{marginLeft: 5}} className='otp-aux-link'>
                        Send OTP code again
                    </span>
                </p>
            </div>
        </div>
    </div>
  );
};

export default OtpPage;