import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Image } from 'react-bootstrap';
import CustomButton from '../../Components/Common/CustomButton/Index';
import Input from '../../Components/Common/Input/Input';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import LoaderScreen from '../../Components/Common/LoaderScreen/LoaderScreen';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../Utils/axiosInstance';
import './Styles.css';
import { Link } from 'react-router-dom';
import { saveAccessToken } from '../../Redux/Actions/userActions';

function SignIn() {
    const dispatch = useDispatch();
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [passwordA, setPasswordA] = useState(false);
    const [loading, setLoading] = useState(false);

    const onEnterValue = ({name, value}) => { 
        setForm({...form, [name]: value});
        
        if(value !== '') {

            if(name === 'password') {

                if(value.length < 5) {
                    setErrors(prev => {return {...prev, [name]: `Password needs to made up of alpha-numeric characters`}});
                } else {
                setErrors(prev => {return {...prev, [name]: null}});
                }; 

            } else if (name === 'companyEmail') {
               
                const regex = new RegExp (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
                const isEmailValid = regex.test(value);
    
                if(value.length < 12 || !isEmailValid) {
                    setErrors(prev => {return {...prev, [name]: `Please email should be properly formated`}});
                } else {
                    setErrors(prev => {return {...prev, [name]: null}});
                };

            }
        } else {
            setErrors(prev => {return {...prev, [name]: `This field is required`}});
        };
    };

    const signIn = async() => {
        setLoading(true);
        try {
            const res = await axiosInstance({
                url: '/business/login',
                method: 'POST',
                data:{
                    email: form.companyEmail,
                    password: form.password,
                }
            });
            const {data, message} = res.data;
            const accessToken = data.token;

            dispatch(saveAccessToken(accessToken));

            toast.success(message, {
                position: toast.POSITION.TOP_RIGHT
            });
            window.location.assign('/dashboard');
            setLoading(false);
            return(<ToastContainer />)

        } catch(error) {
            setLoading(false);
            const err = error.response.data.message;
            console.log('err ', err);
            toast.error(err, {
                position: toast.POSITION.TOP_RIGHT
            })
            return(<ToastContainer />)
        }
    };

    const onSubmit = () => {

        if(!form.companyEmail) {
            setErrors(prev => {return {...prev, firstName: 'Please add a company email'}});
        }

        if(!form.password) {
            setErrors(prev => {return {...prev, password: 'Please add a password'}});
        }

        if(
            Object.values(form).length === 2 
        ) {
            signIn();
        } else {
            toast.warning('Please ensure all fields are filled.', {
                position: toast.POSITION.TOP_RIGHT
            })
        }

    };

    if(loading) {
        return (<LoaderScreen loadingText={'processing sign in'} />)
    }

  return (
    <div className='parent-cont-2'>
        {/* for toast notification containing */}
        <ToastContainer />

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
                        onChange={(e) => {
                            const value = e.target.value;
                            onEnterValue({name: 'companyEmail', value})
                        }}
                        error={errors.companyEmail}
                    />
                </div>

                <div className='input-holder'>
                    <Input  
                        label={'Password'}
                        type={!passwordA ? 'password' : 'text'}
                        onChange={(e) => {
                            const value = e.target.value;
                            onEnterValue({name: 'password', value})
                        }}
                        error={errors.password}
                        icon={!passwordA ? <AiFillEyeInvisible style={{fontSize: 20}} /> : <AiFillEye style={{fontSize: 20}} />}
                        iconClick={() => setPasswordA(!passwordA)}
                    />
                </div>

                <div className='input-holder'>
                    <CustomButton 
                        title={'Log in'}
                        textColor={'#fff'}
                        bgColor={'#03A63C'}
                        disabledColor={'rgba(3, 166, 60, 0.5)'}
                        disabled={false}
                        onClick={onSubmit}
                    />
                </div>

                <Link style={{textDeoration: 'none'}} to={'/'}>
                    <p className='otp-aux-link'>
                        Not registered? Click here to 
                        <span style={{marginLeft: 5}} className='otp-aux-link'>
                        Register
                        </span>
                    </p>
                </Link>
            </div>
        </div>
    </div>
  );
};

export default SignIn;