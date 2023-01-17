import React, {useEffect, useState} from 'react';
import { Image } from 'react-bootstrap';
import CustomButton from '../../Components/Common/CustomButton/Index';
import { toast, ToastContainer } from 'react-toastify';
import LoaderScreen from '../../Components/Common/LoaderScreen/LoaderScreen';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../Utils/axiosInstance';
import accessLocalStorage from '../../Utils/accessLocalStorage';
import Spinner from 'react-bootstrap/Spinner';

import './Styles.css';
import { Link } from 'react-router-dom';

function OtpPage() {
    const [entry1, setEntry1] = useState('');
    const [entry2, setEntry2] = useState('');
    const [entry3, setEntry3] = useState('');
    const [entry4, setEntry4] = useState('');
    const [loading, setLoading] = useState(false);
    const [loaderMsg, setLoaderMsg] = useState('');
    const [disable, setDisable] = useState(true);

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
            console.log('res ', res);
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

    function clickEvent(first,last){
        if(first){
            document.getElementById(last).focus();
        }
    };

    useEffect(() => {
        let arr = [];
        arr[0] = entry1;
        arr[1] = entry2;
        arr[2] = entry3;
        arr[3] = entry4;

        if(arr.length === 4) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [entry1, entry2, entry3, entry4])

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
                kindly input the 4-digit code below
            </p>


            <div className='form-cont-otp'>
                <div className='otp-input-cont'>
                    <input 
                        type={'text'} 
                        className='otp-input' 
                        maxLength={1}
                        id={'ist'}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEntry1(value)
                        }}
                        onKeyUp={(e) => clickEvent(e.target.value, 'sec')}
                    />
                    <input 
                        type={'text'} 
                        className='otp-input'
                        maxLength={1} 
                        id={'sec'}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEntry2(value)
                        }}
                        onKeyUp={(e) => clickEvent(e.target.value, 'third')}
                    />
                    <input 
                        type={'text'} 
                        className='otp-input' 
                        maxLength={1} 
                        id={'third'}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEntry3(value)
                        }}
                        onKeyUp={(e) => clickEvent(e.target.value, 'forth')}
                    />
                    <input 
                        type={'text'} 
                        className='otp-input' 
                        maxLength={1}
                        id={'forth'}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEntry4(value)
                        }}
                    />
                </div>

                <div className='input-holder-1'>
                    <CustomButton 
                        title={'Continue'}
                        textColor={'#fff'}
                        bgColor={'#03A63C'}
                        disabledColor={'rgba(3, 166, 60, 0.5)'}
                        disabled={disable}
                        onClick={onSubmit}
                        icon={loading && <Spinner style={{marginTop: 5, marginLeft: 15}} animation="border" variant="light" />}
                    />
                </div>

                <p className='otp-aux-link'>
                    Didn't get the email? 
                    <span style={{marginLeft: 5}} className='otp-aux-link' onClick={resendOtp}>
                        Send OTP code again
                    </span>
                </p>

                <Link style={{textDecoration: 'none'}} to={'/sign-in'}>
                    <p className='otp-aux-link-2'>
                        Click here to  
                        <span style={{margin: '0px 5px'}} className='otp-aux-link'>
                            sign in
                        </span>
                        if registered
                    </p>
                </Link>
            </div>
        </div>
    </div>
  );
};

export default OtpPage;