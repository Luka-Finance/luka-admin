import React, {useState} from 'react';
import Image from 'react-bootstrap/Image';
import Input from '../../Components/Common/Input/Input';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import CustomButton from '../../Components/Common/CustomButton/Index';
import CustomSelector from '../../Components/Common/CustomSelector/CustomSelector';
import axiosInstance from '../../Utils/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import LoaderScreen from '../../Components/Common/LoaderScreen/LoaderScreen';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import accessLocalStorage from '../../Utils/accessLocalStorage';
import './Styles.css';



function Register() {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [passwordA, setPasswordA] = useState(false);
    const [passwordB, setPasswordB] = useState(false);
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
    
          } else if (name === 'confirmPassword') {

            if(form.password !== value) {
                setErrors(prev => {return {...prev, [name]: `Passwords do not match`}});
            } else {
                setErrors(prev => {return {...prev, [name]: null}});
            };

          } else if (name === 'companyName') {

            if(value.length < 3) {
                setErrors(prev => {return {...prev, [name]: `Company name should be a minimum of 3 characters`}});
              } else {
                setErrors(prev => {return {...prev, [name]: null}});
            };

          } else if (name === 'companyEmail') {

            const regex = new RegExp (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
            const isEmailValid = regex.test(value);

            if(value.length < 12 || !isEmailValid) {
                setErrors(prev => {return {...prev, [name]: `Company email should be properly formated`}});
            } else {
                setErrors(prev => {return {...prev, [name]: null}});
            };

          } 
        //   else if (name === 'businessType') {

        //     if(value === '') {
        //         setErrors(prev => {return {...prev, [name]: `Please select a business type`}});
        //     } else {
        //         setErrors(prev => {return {...prev, [name]: null}});
        //     }

        //   } else if (name === 'companyRCNumber') {

        //     if(form.businessType === 'registered' && value.length < 7) {
        //         setErrors(prev => {return {...prev, [name]: `Please enter a correct RC number`}});
        //     } else {
        //         setErrors(prev => {return {...prev, [name]: null}});
        //     }

        //   } 
          else if (name === 'companyPhone') {
            let val;
            let num = [];
            num.push(value[0]);
            num.push(value[1]);
            num.push(value[2]);
            val = num.join('');
            if (value.length !== 11 && (val !== '070' || val !== '081' || val !== '080' || val !== '090')) {
                setErrors(prev => {return {...prev, [name]: `Please enter a valid phone number`}});
            } else {
                setErrors(prev => {return {...prev, [name]: null}});
            }
          } else {
            setErrors(prev => {return {...prev, [name]: null}});
          };
          
        } else {
          setErrors(prev => {return {...prev, [name]: `This field is required`}});
        };
    };

    const formatPhone = (phone) => {
        return phone.replace(/[0-9]/, '+234');
    };

    const register = async() => {
        setLoading(true);
        try {
            const res = await axiosInstance({
                url: '/business/register',
                method: 'POST',
                data:{
                    name: form.companyName,
                    email: form.companyEmail,
                    password: form.password,
                    country: form.companyCountry,
                    city: form.companyCity,
                    phone: formatPhone(form.companyPhone), 
                }
            });
            accessLocalStorage.setToLs('companyEmail', form.companyEmail);
            accessLocalStorage.setToLs('companyPhone', form.companyPhone);

            window.location.assign('/otp-entry');
            setLoading(false);

            const {data, message} = res;
            const otpToken = data.data.otp.data;
            accessLocalStorage.setToLs('otpToken', otpToken);
            toast.success(message, {
                position: toast.POSITION.TOP_RIGHT
            });
            return(<ToastContainer />)
        } catch(error) {
            setLoading(false);
            // console.log('err ', error);
            const err = error.response.data.message
            toast.error(err, {
                position: toast.POSITION.TOP_RIGHT
            })
            return(<ToastContainer />)
        }
    };

    const onSubmit = () => {
    
        if(!form.companyName) {
          setErrors(prev => {return {...prev, companyName: 'Please add a company name'}});
        }
    
        if(!form.companyEmail) {
          setErrors(prev => {return {...prev, firstName: 'Please add a company email'}});
        }
    
        if(!form.companyCountry) {
          setErrors(prev => {return {...prev, lastName: 'Please add the country of your company'}});
        }
    
        if(!form.companyCity) {
          setErrors(prev => {return {...prev, email: 'Please add the city of your company'}});
        }

        if(!form.companyPhone) {
            setErrors(prev => {return {...prev, email: 'Please add a company phone number'}});   
        }
    
        if(!form.password) {
          setErrors(prev => {return {...prev, password: 'Please add a password'}});
        }

        if(!form.confirmPassword) {
            setErrors(prev => {return {...prev, password: 'Please confirm your password'}});
        }

        if(
            Object.values(form).length === 7 
        ) {
            register();
        } else {
            toast.warning('Please ensure all fields are filled.', {
                position: toast.POSITION.TOP_RIGHT
            })
            return(<ToastContainer />)
        }
    
    };

    if(loading) {
        return (<LoaderScreen loadingText={'processing registration'} />)
    }


  return (
    <div className='parent-cont'>
        {/* for toast notification containing */}
        <ToastContainer />

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
                        onChange={(e) => {
                            const value = e.target.value;
                            onEnterValue({name: 'companyName', value})
                        }}
                        error={errors.companyName}
                    />
                </div>

                <div className='input-holder'>
                    <Input  
                        label={'Company\'s Email'}
                        type={'email'}
                        onChange={(e) => {
                            const value = e.target.value;
                            onEnterValue({name: 'companyEmail', value})
                        }}
                        error={errors.companyEmail}
                    />
                </div>

                <div className='location-cont'>
                    <div className='location-cont-child'>
                        <CustomSelector 
                            label={'Country'}
                            options={['Nigeria', 'Ghana','Togo', 'Cameroon']}
                            onChange={(e) => {
                                const value = e.target.value;
                                onEnterValue({name: 'companyCountry', value})
                            }}
                            error={errors.companyCountry}
                        />
                    </div>

                    <div className='location-cont-child'>
                        <CustomSelector 
                            label={'City'}
                            options={['Lagos', 'Accra','Lome', 'Yaounde']}
                            onChange={(e) => {
                                const value = e.target.value;
                                onEnterValue({name: 'companyCity', value})
                            }}
                            error={errors.companyCity}
                        />
                    </div>
                </div>

                <div className='input-holder'>
                    <Input  
                        label={'Company\'s Phone number'}
                        type={'tel'}
                        onChange={(e) => {
                            const value = e.target.value;
                            onEnterValue({name: 'companyPhone', value})
                        }}
                        error={errors.companyPhone}
                    />
                </div>

                {/* <div className='location-cont'>
                    <div className='location-cont-child'>
                        <CustomSelector 
                            label={'Type'}
                            options={['unregistered', 'registered']}
                            onChange={(e) => {
                                const value = e.target.value;
                                onEnterValue({name: 'businessType', value})
                            }}
                            error={errors.businessType}
                        />
                    </div>

                    <div className='location-cont-child'>
                       {
                        form.businessType === 'registered' && (
                            <Input  
                                label={'RC Number'}
                                type={'text'}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    onEnterValue({name: 'companyRCNumber', value})
                                }}
                                error={errors.companyRCNumber}
                            />
                        )
                       }
                    </div>
                </div> */}

                <div className='input-holder'>
                    <Input  
                        label={'Create Password'}
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
                    <Input  
                        label={'Confirm Password'}
                        type={!passwordB ? 'password' : 'text'}
                        onChange={(e) => {
                            const value = e.target.value;
                            onEnterValue({name: 'confirmPassword', value})
                        }}
                        error={errors.confirmPassword}
                        icon={!passwordB ? <AiFillEyeInvisible style={{fontSize: 20}} /> : <AiFillEye style={{fontSize: 20}} />}
                        iconClick={() => setPasswordB(!passwordB)}
                    />
                </div>

                <div className='tc-cont'>
                    <input type={'checkbox'} className='tc-checkbox' checked={true} readOnly />
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
                        disabled={false}
                        onClick={onSubmit}
                    />
                </div>

                <Link style={{textDeoration: 'none'}} to={'/sign-in'}>
                    <p className='otp-aux-link'>
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

export default Register;