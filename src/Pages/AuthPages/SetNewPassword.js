import React, {useEffect, useState} from 'react';
import { Image } from 'react-bootstrap';
import CustomButton from '../../Components/Common/CustomButton/Index';
import Input from '../../Components/Common/Input/Input';
import { AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai';
import './Styles.css';
import axiosInstance from '../../Utils/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-phone-input-2/lib/style.css';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

function SetNewPassword() {
    const [form, setForm] = useState({password: '', confirmPassword: ''});
    const [errors, setErrors] = useState({});
    const [passwordA, setPasswordA] = useState(false);
    const [passwordB, setPasswordB] = useState(false);
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(true);

    const onEnterValue = ({name, value}) => {
        setForm({...form, [name]: value});

        if(value !== '') { 
            if(name === 'password') {
    
                if(value.length < 6) {
                  setErrors(prev => {return {...prev, [name]: `Password needs to made up of alpha-numeric characters`}});
                } else {
                  setErrors(prev => {return {...prev, [name]: null}});
                };
        
            } else if (name === 'confirmPassword') {
    
                if(form.password !== value) {
                    setErrors(prev => {return {...prev, [name]: `Passwords do not match`}});
                } else {
                    setErrors(prev => {return {...prev, [name]: null}});
                };
            
            }
    
              
        } else {
            setErrors(prev => {return {...prev, [name]: `This field is required`}});
        };
    };

    const onSubmit = async() => {
        setLoading(true);
        try {
            const res = axios.post('https://luka-api.vercel.app/business/reset-password', {
              data: {
                password: form.password,
              },  
              headers: {
                token: `Bearer ${window.location.search.split('/')[2]}`
              }
            })
            // await axiosInstance({
            // url: '/business/reset-password',
            // method: 'POST',
            // data: {
            //     password: form.password,
            //     token: window.location.search.split('/')[2]
            // }
            // }) 
            setLoading(false);
        //    console.log('res ',res)
            const {message} = res.data;
            toast.success(message, {
                position: toast.POSITION.TOP_RIGHT
            })
            window.location.assign('/sign-in');
            setPasswordA(true);
            setPasswordB(true);
            setDisable(true);
            return(<ToastContainer />)
        } catch (error) {
            setPasswordA(true);
            setPasswordB(true);
            setLoading(false);
            setDisable(true);
            const err = error.response.data.message
            toast.error(err, {
                position: toast.POSITION.TOP_RIGHT
            })
            return(<ToastContainer />)
        }
    };

    useEffect(() => {
        if(form.password.length > 5 && form.confirmPassword.length > 5) {
            setDisable(false); 
        } else {
            setDisable(true)
        }
    }, [form])

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
                        type={!passwordA ? 'password' : 'text'}
                        onChange={(e) => {
                            const value = e.target.value;
                            onEnterValue({name: 'password', value})
                        }}
                        error={errors.password}
                        icon={!passwordA ? <AiOutlineEyeInvisible style={{fontSize: 20}} /> : <AiOutlineEye style={{fontSize: 20}} />}
                        iconClick={() => setPasswordA(!passwordA)}
                    />
                </div>

                <div className='input-holder'>
                    <Input  
                        label={'Confirm Password'}
                        type={!passwordB ? 'password' : 'text'}
                        onChange={(e) => {
                            const value = e.target.value;
                            onEnterValue({name: 'confirmPassword', value})
                        }}
                        error={errors.confirmPassword}
                        icon={!passwordB ? <AiOutlineEyeInvisible style={{fontSize: 20}} /> : <AiOutlineEye style={{fontSize: 20}} />}
                        iconClick={() => setPasswordB(!passwordB)}
                    />
                </div>

                <div className='input-holder'>
                    <CustomButton 
                        title={'Change Pasword'}
                        textColor={'#fff'}
                        bgColor={'#03A63C'}
                        disabledColor={'rgba(3, 166, 60, 0.5)'}
                        disabled={disable}
                        onClick={onSubmit}
                        icon={loading && <Spinner style={{marginTop: 5, marginLeft: 15}} animation="border" variant="light" />}
                    />
                </div>
            </div>
        </div>
    </div>
  );
};

export default SetNewPassword;