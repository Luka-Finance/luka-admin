import React, {useState} from 'react';
import { Image } from 'react-bootstrap';
import CustomButton from '../../Components/Common/CustomButton/Index';
import { toast, ToastContainer } from 'react-toastify';
import LoaderScreen from '../../Components/Common/LoaderScreen/LoaderScreen';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../Utils/axiosInstance';
import accessLocalStorage from '../../Utils/accessLocalStorage';

import './Styles.css';

function OtpPage() {
    const [entry1, setEntry1] = useState('');
    const [entry2, setEntry2] = useState('');
    const [entry3, setEntry3] = useState('');
    const [entry4, setEntry4] = useState('');
    // const [entry5, setEntry5] = useState('');
    // const [entry6, setEntry6] = useState('');
    const [loading, setLoading] = useState(false);
    const [loaderMsg, setLoaderMsg] = useState('');

    const resendOtp = async() => {
        setLoaderMsg('resending otp');
        setLoading(true);
        try {
            const res = await axiosInstance({
                url: '/business/resend-otp',
                method: 'POST',
                data: {
                    type: 'verification',
                    email: accessLocalStorage.getFromLs('companyEmail'), 
                    phone: accessLocalStorage.getFromLs('companyPhone')
                }
            })
            console.log('res ', res);
            const {data, message} = res;
            const otpToken = data.data.otp.data;
            accessLocalStorage.setToLs('otpToken', otpToken);
            toast.success(message, {
                position: toast.POSITION.TOP_RIGHT
            });
            setLoading(false);
            return(<ToastContainer />)
        } catch(error) {
            setLoading(false);
            const err = error.response.data.message;
            toast.error(err, {
                position: toast.POSITION.TOP_RIGHT
            })
            return(<ToastContainer />) 
        }
    };

    const verifyOtp = async(otp) => {
        setLoaderMsg('verifying otp');
        setLoading(true);
        try {
            const res = await axiosInstance({
                url: '/business/verify-otp',
                method: 'POST',
                data: {
                  token: accessLocalStorage.getFromLs('otpToken'),
                  otp,
                  client: accessLocalStorage.getFromLs('companyEmail'),
                  type: 'verification'  
                }
            })
            window.location.assign('/sign-in');
            setLoading(false);
            // console.log('res ', res);
            const message = res.data.message;
            toast.success(message, {
                position: toast.POSITION.TOP_RIGHT
            });
            return(<ToastContainer />)
        } catch(error) {
            setLoading(false);
            const err = error.response.data.message;
            // console.log(error);
            toast.error(err, {
                position: toast.POSITION.TOP_RIGHT
            })
            return(<ToastContainer />) 
        }
    };

    const onSubmit = () => {
        let arr = [];
        arr[0] = entry1;
        arr[1] = entry2;
        arr[2] = entry3;
        arr[3] = entry4;
        // arr[4] = entry5;
        // arr[5] = entry6;
        let checker = arr.map(cur => cur === '');
        const otp = arr.join(''); 
        if(checker.includes(true)) {
            toast.warning('Enter your correct 4 digit OTP code.', {
                position: toast.POSITION.TOP_RIGHT
            })
            return(<ToastContainer />) 
        } else {
            verifyOtp(otp); 
        }
    };

    if(loading) {
        return (<LoaderScreen loadingText={loaderMsg} />)
    }

  return (
    <div className='parent-cont-2'>
        {/* for toast notification containing */}
        <ToastContainer />

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
                        onChange={(e) => {
                            const value = e.target.value;
                            setEntry1(value)
                        }}
                    />
                    <input 
                        type={'text'} 
                        className='otp-input'
                        maxLength={1} 
                        onChange={(e) => {
                            const value = e.target.value;
                            setEntry2(value)
                        }}
                    />
                    <input 
                        type={'text'} 
                        className='otp-input' 
                        maxLength={1} 
                        onChange={(e) => {
                            const value = e.target.value;
                            setEntry3(value)
                        }}
                    />
                    <input 
                        type={'text'} 
                        className='otp-input' 
                        maxLength={1}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEntry4(value)
                        }}
                    />
                    {/* <input 
                        type={'text'} 
                        className='otp-input' 
                        maxLength={1}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEntry5(value)
                        }}
                    />
                    <input 
                        type={'text'} 
                        className='otp-input' 
                        maxLength={1}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEntry6(value)
                        }}
                    /> */}
                </div>

                <div className='input-holder-1'>
                    <CustomButton 
                        title={'Continue'}
                        textColor={'#fff'}
                        bgColor={'#03A63C'}
                        disabledColor={'rgba(3, 166, 60, 0.5)'}
                        disabled={false}
                        onClick={onSubmit}
                    />
                </div>

                <p className='otp-aux-link'>
                    Didn't get the email? 
                    <span style={{marginLeft: 5}} className='otp-aux-link' onClick={resendOtp}>
                        Send OTP code again
                    </span>
                </p>
            </div>
        </div>
    </div>
  );
};

export default OtpPage;