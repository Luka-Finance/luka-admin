import React from 'react';
import Image from 'react-bootstrap/Image';
import { BsCheck2 } from 'react-icons/bs';

import './Styles.css';

function SuccessReg() {
  return (
    <div className='parent-cont-2'>
        <div className='banner'>
            <Image src='assets/Logo.svg' alt="logo" />
        </div>

        <div className='body'>
            <div className='check-cont'>
                <BsCheck2 style={{fontSize: 150, color: '#03A63C',}}  />
            </div>

            <p className='success-title'>
             Registration Successful
            </p>
            
            <p className='success-text'>
                Please check your mail or your phone number and enter the OTP sent
            </p>

            <p className='enter-otp-link'>
                Enter OTP
            </p>

            <p className='resent-otp-link'>
                Send OTP again
            </p>
        </div>
    </div>
  );
};

export default SuccessReg;