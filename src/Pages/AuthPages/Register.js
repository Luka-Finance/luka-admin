import React from 'react';
import Image from 'react-bootstrap/Image';
import Input from '../../Components/Common/Input/Input';
import { AiFillEyeInvisible } from 'react-icons/ai';

import './Styles.css';

function Register() {
  return (
    <div className='parent-cont'>
        <div className='banner'>
            <Image src='assets/Logo.svg' alt="logo" />
        </div>
        
        <div className='body'>
            <div className='form-title '>
                Register
            </div>
        
            <div className='form-cont'>
                <div style={{marginBottom: 25}}>
                    <Input  
                        label={'Company\'s Name'}
                        type={'text'}
                        onChange={(e) => {console.log(e.target.value)}}
                        error={''}
                    />
                </div>

                <div style={{marginBottom: 25}}>
                    <Input  
                        label={'Company\'s Email'}
                        type={'email'}
                        onChange={(e) => {console.log(e.target.value)}}
                        error={''}
                    />
                </div>

                <div className='location-cont'>
                    <div style={{marginBottom: 25, marginRight: 15}}>
                        <Input  
                            label={'Country'}
                            type={'text'}
                            onChange={(e) => {console.log(e.target.value)}}
                            error={''}
                        />
                    </div>

                    <div style={{marginBottom: 25}}>
                        <Input  
                            label={'City'}
                            type={'text'}
                            onChange={(e) => {console.log(e.target.value)}}
                            error={''}
                        />
                    </div>
                </div>

                <div style={{marginBottom: 25}}>
                    <Input  
                        label={'Company\'s Phone number'}
                        type={'tel'}
                        onChange={(e) => {console.log(e.target.value)}}
                        error={''}
                    />
                </div>

                <div style={{marginBottom: 25}}>
                    <Input  
                        label={'Create Password'}
                        type={'password'}
                        onChange={(e) => {console.log(e.target.value)}}
                        error={''}
                        icon={<AiFillEyeInvisible style={{fontSize: 20}} />}
                    />
                </div>

                <div style={{marginBottom: 25}}>
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
            </div>
        </div>
    </div>
  );
};

export default Register;