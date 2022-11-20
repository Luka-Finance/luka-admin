import React, {useState} from 'react';
import AuxPageHead from '../../../Components/AuxPageHead/AuxPageHead';
import Layout from '../../../Components/Layout/Layout';
import Input from '../../../Components/Common/Input/Input';
import CustomSelector from '../../../Components/Common/CustomSelector/CustomSelector';
import { BsExclamationCircle} from 'react-icons/bs';
import CustomButton from '../../../Components/Common/CustomButton/Index';
import { toast, ToastContainer } from 'react-toastify';
import LoaderScreen from '../../../Components/Common/LoaderScreen/LoaderScreen';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../Utils/axiosInstance';

import './Styles.css';

function Settings() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingRC, setLoadingRC] = useState(false);
  const [loadingTIM, setLoadingTIN] = useState(false);
  const [loaderText, setLoaderText] = useState('');

  const onEnterValue = ({name, value}) => { 
    setForm({...form, [name]: value});

    if(value !== '') {

        if(name === 'companyName' || name === 'contactName') {

            if(value.length < 3) {
                setErrors(prev => {return {...prev, [name]: `Company name should be a minimum of 3 characters`}});
              } else {
                setErrors(prev => {return {...prev, [name]: null}});
            };

        } else if (name === 'rcNumber') {

            if(value.length < 7) {
                setErrors(prev => {return {...prev, [name]: `R.C number should be 7 characters long.`}});
              } else {
                setErrors(prev => {return {...prev, [name]: null}});
            };

        } else if (name === 'tinNumber') {

            if(value.length < 7) {
                setErrors(prev => {return {...prev, [name]: `TIN number should be 7 characters long.`}});
              } else {
                setErrors(prev => {return {...prev, [name]: null}});
            };

        } else if (name === 'companyPhone') {
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
        } else if (name === 'companyEmail') {

            const regex = new RegExp (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
            const isEmailValid = regex.test(value);

            if(value.length < 12 || !isEmailValid) {
                setErrors(prev => {return {...prev, [name]: `Company email should be properly formated`}});
            } else {
                setErrors(prev => {return {...prev, [name]: null}});
            };

        } else if (name === 'contactName') {

            if(value.length < 3) {
                setErrors(prev => {return {...prev, [name]: `Contact name should be a minimum of 3 characters`}});
              } else {
                setErrors(prev => {return {...prev, [name]: null}});
            };

        } else if (name === 'contactRole') {

            if(value.length < 4) {
                setErrors(prev => {return {...prev, [name]: `Contact role should be a minimum of 4 characters`}});
              } else {
                setErrors(prev => {return {...prev, [name]: null}});
            };

        } else if (name === 'contactEmail') {

            const regex = new RegExp (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
            const isEmailValid = regex.test(value);

            if(value.length < 12 || !isEmailValid) {
                setErrors(prev => {return {...prev, [name]: `Company email should be properly formated`}});
            } else {
                setErrors(prev => {return {...prev, [name]: null}});
            };

        } else if (name === 'contactPhone') {
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
        } else if (name === 'companyAddress') {

            if(value.length < 15) {
                setErrors(prev => {return {...prev, [name]: `Enter correct address`}});
              } else {
                setErrors(prev => {return {...prev, [name]: null}});
            };

        } else if (name === 'companyCountry') {

            if(value.length < 5) {
              setErrors(prev => {return {...prev, [name]: `Select the country`}});
            } else {
              setErrors(prev => {return {...prev, [name]: null}});
            };
    
        } else if (name === 'companyCity') {

            if(value.length < 5) {
              setErrors(prev => {return {...prev, [name]: `Select the city`}});
            } else {
              setErrors(prev => {return {...prev, [name]: null}});
            };
    
        } else if (name === 'payTransactionFee') {

            if(value.length < 5) {
              setErrors(prev => {return {...prev, [name]: `Select select who pays transaction fee`}});
            } else {
              setErrors(prev => {return {...prev, [name]: null}});
            };
    
        } else if (name === 'paymentDate') {

            if(value < 1 || value > 28) {
              setErrors(prev => {return {...prev, [name]: `Enter value between 1 and 28`}});
            } else {
              setErrors(prev => {return {...prev, [name]: null}});
            };
    
        }

    } else {
        setErrors(prev => {return {...prev, [name]: `This field is required`}});  
    }
  };

  const verifyRcNUmber = async(value) => {
    if(value.length === 7) {
        setLoadingRC(true);
        try {
            const res = await axiosInstance({
                url: '/business/verify/rc',
                method: 'POST',
                data: {
                    companyName: form.companyName,
                    rcNumber: form.rcNumber
                }
            });
            const {message} = res.data;
            toast.success(message, {
                position: toast.POSITION.TOP_RIGHT
            });
            setLoadingRC(false);
            return(<ToastContainer />)
        } catch (error) {
            setLoadingRC(false);
            setErrors(prev => {return {...prev, ['rcNumber']: `${error.message}`}});
            const err = error.response.data.message;
            toast.error(err, {
                position: toast.POSITION.TOP_RIGHT
            })
            return(<ToastContainer />)
        }
    }
  };

  const verifyTin = async(value) => {
    if(value.length === 7) {
        setLoadingTIN(true);
        try {
            const res = await axiosInstance({
                url: '/business/verify/tin',
                method: 'POST',
                data: {
                    searchParameter: form.tinNumber,
                }
            });
            const {message} = res.data;
            toast.success(message, {
                position: toast.POSITION.TOP_RIGHT
            });
            setLoadingTIN(false);
            return(<ToastContainer />)
        } catch (error) {
            setLoadingTIN(false);
            setErrors(prev => {return {...prev, ['tinNumber']: `${error.message}`}});
            const err = error.response.data.message
            toast.error(err, {
                position: toast.POSITION.TOP_RIGHT
            })
            return(<ToastContainer />)
        }
    }
  };

  const updateProfile = async() => {
    setLoaderText('Upadeting profile');
    setLoading(true);

    const formData = new FormData();
    const file = form.companyCac ? form.companyCac : '';
	formData.append('File', file);

    try {
      const res = await axiosInstance({
        url: '/business/update-profile',
        method: 'PATCH',
        data: {
            name: form.companyName,
            phone: form.companyPhone,
            country: form.companyCountry,
            city: form.companyCity,
            email: form.companyEmail,
            paysTransactionFee: form.payTransactionFee,
            payday: form.paymentDate,
            rcNumber: form.rcNumber,
            type: 'registered',
            address: form.companyAddress,
            contactPersonName: form.contactName,
            contactPersonEmail: form.contactEmail,
            contactPersonRole: form.contactRole,
            contactPersonPhone: form.contactPhone,
            // cacDoc: formData,
        }
      });
      console.log('res ', res);
      const {message} = res.data;
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
        setLoading(false); 
        return(<ToastContainer />)  
    } catch (error) {
        setLoading(false);
        const err = error.response.data.message
        toast.error(err, {
            position: toast.POSITION.TOP_RIGHT
        })
        return(<ToastContainer />)   
    }
  };

  if(loading) {
    return (<LoaderScreen loadingText={loaderText} />)
  }

  return (
    <Layout currentPage={'settings'}>
        {/* for toast notification containing */}
        <ToastContainer />

        <AuxPageHead 
         auxHeadFilter={false}
         auxHeadTitle={'Settings'}
         auxBtnAppear={false}
        />
        <div className='settings-dashboard'>

            <div className='settings-sub-cont'>
               <div className='settings-form-title-cont'>
                    <p className='settings-form-title'>
                        Profile Settings
                    </p>
               </div>

               <div className='settings-sub-form-cont'>
                    <div className='settings-input-cont'>
                        <Input 
                            label={'Company name'}
                            type={'text'}
                            onChange={(e) => {
                                const value = e.target.value;
                                onEnterValue({name: 'companyName', value})
                            }}
                            error={errors.companyName}
                        />
                    </div>

                    <div className='settings-input-cont'>
                        <Input 
                            label={'RC Number'}
                            type={'text'}
                            onChange={(e) => {
                                const value = e.target.value;
                                onEnterValue({name: 'rcNumber', value});
                                verifyRcNUmber(value);
                            }}
                            error={errors.rcNumber}
                        />
                        {loadingRC && (<h5 style={{color: 'green'}}>Checking R.C number....</h5>)}
                    </div>

                    <div className='settings-input-cont'>
                        <Input 
                            label={'TIN Number'}
                            type={'text'}
                            onChange={(e) => {
                                const value = e.target.value;
                                onEnterValue({name: 'tinNumber', value});
                                verifyTin(value);
                            }}
                            error={errors.tinNumber}
                        />
                        {loadingTIM && (<h5 style={{color: 'green'}}>Checking TIN number....</h5>)}
                    </div>

                    <div className='settings-input-cont'>
                        <Input 
                            label={'Company email'}
                            type={'email'}
                            onChange={(e) => {
                                const value = e.target.value;
                                onEnterValue({name: 'companyEmail', value});
                            }}
                            error={errors.companyEmail}
                        />
                    </div>

                    <div className='settings-input-cont'>
                        <Input 
                            label={'Company phone number'}
                            type={'tel'}
                            onChange={(e) => {
                                const value = e.target.value;
                                onEnterValue({name: 'companyPhone', value})
                            }}
                            error={errors.companyPhone}
                        />
                    </div>

                    <div className='settings-sub-form-cont-child'>
                        <div className='settings-input-cont'>
                            <Input 
                                label={'Contact person name'}
                                type={'text'}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    onEnterValue({name: 'contactName', value})
                                }}
                                error={errors.contactName}
                            />
                        </div>

                        <div className='settings-input-cont'>
                            <Input 
                                label={'Role of contact person'}
                                type={'text'}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    onEnterValue({name: 'contactRole', value})
                                }}
                                error={errors.contactRole}
                            />
                        </div>
                    </div>

                    <div className='settings-sub-form-cont-child'>
                        <div className='settings-input-cont'>
                            <Input 
                                label={'Email of contact person'}
                                type={'email'}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    onEnterValue({name: 'contactEmail', value})
                                }}
                                error={errors.contactEmail}
                            />
                        </div>

                        <div className='settings-input-cont'>
                            <Input 
                                label={'Mobile of the contact person'}
                                type={'tel'}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    onEnterValue({name: 'contactPhone', value})
                                }}
                                error={errors.contactPhone}
                            />
                        </div>
                    </div>
               </div> 
            </div>

            <div className='settings-sub-cont'>

                <div className='settings-form-title-cont'>
                    <p className='settings-form-title'>
                        Business Verification
                        and KYC (Document
                        Verification)
                    </p>
               </div> 

               <div className='settings-sub-form-cont'>
                    {/* <div className='settings-input-cont'>
                        <Input 
                            label={'CAC Document Upload'}
                            type={'file'}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                console.log(file);
                                onEnterValue({name: 'companyCac', file})
                            }}
                            icon={<BsCloudArrowUp style={{marginRight: 20, fontSize: 25}} />}
                            error={''}
                        />
                    </div> */}

                    <div className='settings-input-cont'>
                        <Input 
                            label={'Company Address'}
                            type={'text'}
                            onChange={(e) => {
                                const value = e.target.value;
                                onEnterValue({name: 'companyAddress', value})
                            }}
                            error={errors.companyAddress}
                        />
                    </div>

                    <div className='settings-sub-form-cont-child'>
                        <div className='settings-input-cont'>
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

                        <div className='settings-input-cont'>
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
               </div>

            </div>

            <div className='settings-sub-cont'>

                <div className='settings-form-title-cont'>
                    <p className='settings-form-title'>
                        Earned Wage Settings
                    </p>
               </div> 

               <div className='settings-sub-form-cont'>
                    <div className='settings-input-cont'>
                        <CustomSelector
                            label={'Who pay transaction fee?'}
                            options={['Employer', 'Employee']}
                            onChange={(e) => {
                                const value = e.target.value;
                                onEnterValue({name: 'payTransactionFee', value})
                            }}
                            error={errors.payTransactionFee}
                        />
                    </div>

                    <div className='settings-input-cont'>
                        <Input 
                            label={'Set monthly pay day [1 - 28]'}
                            type={'number'}
                            onChange={(e) => {
                                const value = e.target.value;
                                // console.log(value)
                                onEnterValue({name: 'paymentDate', value})
                            }}
                            error={errors.paymentDate}
                        />
                    </div>

                    <div className='scheduled-payment-cont'>
                        <span>
                            <BsExclamationCircle 
                                style={{
                                    color: '#03A63C',
                                    marginBottom: 20,
                                    marginRight: 10
                                }} 
                            />
                        </span>

                        <p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                            On this day you have written here, we will reset all your employee card back to Zero
                        </p>
                    </div>

                    <div className='settings-form-btn-cont'>
                        <CustomButton
                            onClick={updateProfile} 
                            title={'Save Changes'}
                            textColor={'#fff'}
                            bgColor={'rgba(3, 166, 60, 1)'}
                            disabledColor={'rgba(3, 166, 60, 0.5)'}
                            disabled={false}
                            btnHeight={47}
                        />
                    </div>
               </div>
            </div>
            

        </div>
    </Layout>
  );
};

export default Settings;