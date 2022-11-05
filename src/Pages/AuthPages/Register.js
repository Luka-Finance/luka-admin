import React from 'react';
import Image from 'react-bootstrap/Image';
import Input from '../../Components/Common/Input/Input';
import { AiFillEyeInvisible } from 'react-icons/ai';
import CustomButton from '../../Components/Common/CustomButton/Index';
import CustomSelector from '../../Components/Common/CustomSelector/CustomSelector';

import './Styles.css';

function Register() {
  return (
    <div className='parent-cont'>
        <div className='banner'>
            <Image src='assets/Logo.svg' alt="logo" />
        </div>
        
        <div className='body'>
            <div className='form-title'>
                Register
            </div>
        
            <div className='form-cont'>
                <div className='input-holder'>
                    <Input  
                        label={'Company\'s Name'}
                        type={'text'}
                        onChange={(e) => {console.log(e.target.value)}}
                        error={''}
                    />
                </div>

                <div className='input-holder'>
                    <Input  
                        label={'Company\'s Email'}
                        type={'email'}
                        onChange={(e) => {console.log(e.target.value)}}
                        error={''}
                    />
                </div>

                <div className='location-cont'>
                    <div className='location-cont-child'>
                        <CustomSelector 
                            label={'Country'}
                            options={['Nigeria', 'Ghana','Togo', 'Cameroon']}
                        />
                    </div>

                    <div className='location-cont-child'>
                        <CustomSelector 
                            label={'City'}
                            options={['Lagos', 'Accra','Cotonou', 'Abijan']}
                        />
                    </div>
                </div>

                <div className='input-holder'>
                    <Input  
                        label={'Company\'s Phone number'}
                        type={'tel'}
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
                    <Input  
                        label={'Confirm Password'}
                        type={'password'}
                        onChange={(e) => {console.log(e.target.value)}}
                        error={''}
                        icon={<AiFillEyeInvisible style={{fontSize: 20}} />}
                    />
                </div>

                <div className='tc-cont'>
                    <input type={'checkbox'} className='tc-checkbox' />
                    <p style={{paddingTop: 10, marginLeft: 10}}> 
                        By activating your account, you agree to our Terms and Conditions.  
                    </p>
                </div>

                <div className='input-holder'>
                    <CustomButton 
                        title={'Register'}
                        textColor={'#fff'}
                        bgColor={'#03A63C'}
                        disabledColor={'rgba(3, 166, 60, 0.5)'}
                        disabled={true}
                    />
                </div>

                <p className='otp-aux-link'>
                    Click here to  
                    <span className='otp-aux-link'>
                        sign in
                    </span>
                    if registered
                </p>
            </div>
        </div>
    </div>
  );
};

export default Register;