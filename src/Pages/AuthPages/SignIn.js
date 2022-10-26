import React from 'react';
import { Image } from 'react-bootstrap';
import CustomButton from '../../Components/Common/CustomButton/Index';
import Input from '../../Components/Common/Input/Input';
import { AiFillEyeInvisible } from 'react-icons/ai';

import './Styles.css';

function SignIn() {
  return (
    <div className='parent-cont-2'>
        <div className='banner'>
            <Image src='assets/Logo.svg' alt="logo" />
        </div>

        <div className='body'>
            <div className='form-title'>
                Sign In
            </div>
            
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
                    <Input  
                        label={'Create Password'}
                        type={'password'}
                        onChange={(e) => {console.log(e.target.value)}}
                        error={''}
                        icon={<AiFillEyeInvisible style={{fontSize: 20}} />}
                    />
                </div>

                <div className='input-holder'>
                    <CustomButton 
                        title={'Log in'}
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

export default SignIn;