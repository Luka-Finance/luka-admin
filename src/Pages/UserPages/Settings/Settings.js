import React, {useState} from 'react';
import AuxPageHead from '../../../Components/AuxPageHead/AuxPageHead';
import Layout from '../../../Components/Layout/Layout';
import Input from '../../../Components/Common/Input/Input';
import CustomSelector from '../../../Components/Common/CustomSelector/CustomSelector';
import {BsCloudArrowUp, BsExclamationCircle} from 'react-icons/bs';
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

  const onEnterValue = ({name, value}) => { 
    setForm({...form, [name]: value});

    if(value !== '') {

        if(name === 'companyName') {

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
                body: {
                    companyName: form.companyName,
                    rcNumber: form.rcNumber
                }
            });
            console.log('res ', res);
            setLoadingRC(false);
        } catch (error) {
            setLoadingRC(false);
            setErrors(prev => {return {...prev, ['rcNumber']: `${error.message}`}});
            toast.error(error.message, {
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
                body: {
                    searchParameter: form.tinNumber,
                }
            });
            console.log('res ', res);
            setLoadingTIN(false);
        } catch (error) {
            setLoadingTIN(false);
            setErrors(prev => {return {...prev, ['tinNumber']: `${error.message}`}});
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            return(<ToastContainer />)
        }
    }
  };

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
                            onChange={(e) => console.log(e)}
                            error={''}
                        />
                    </div>

                    <div className='settings-input-cont'>
                        <Input 
                            label={'Company phone number'}
                            type={'tel'}
                            onChange={(e) => console.log(e)}
                            error={''}
                        />
                    </div>

                    <div className='settings-sub-form-cont-child'>
                        <div className='settings-input-cont'>
                            <Input 
                                label={'Contact person name'}
                                type={'text'}
                                onChange={(e) => console.log(e)}
                                error={''}
                            />
                        </div>

                        <div className='settings-input-cont'>
                            <Input 
                                label={'Role of contact person'}
                                type={'text'}
                                onChange={(e) => console.log(e)}
                                error={''}
                            />
                        </div>
                    </div>

                    <div className='settings-sub-form-cont-child'>
                        <div className='settings-input-cont'>
                            <Input 
                                label={'Email of contact person'}
                                type={'email'}
                                onChange={(e) => console.log(e)}
                                error={''}
                            />
                        </div>

                        <div className='settings-input-cont'>
                            <Input 
                                label={'Mobile of the contact person'}
                                type={'tel'}
                                onChange={(e) => console.log(e)}
                                error={''}
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
                    <div className='settings-input-cont'>
                        <Input 
                            label={'CAC Document Upload'}
                            type={'file'}
                            onChange={(e) => console.log(e)}
                            icon={<BsCloudArrowUp style={{marginRight: 20, fontSize: 25}} />}
                            error={''}
                        />
                    </div>

                    <div className='settings-input-cont'>
                        <Input 
                            label={'Company Address'}
                            type={'text'}
                            onChange={(e) => console.log(e)}
                            error={''}
                        />
                    </div>

                    <div className='settings-sub-form-cont-child'>
                        <div className='settings-input-cont'>
                            <Input 
                                label={'Country'}
                                type={'text'}
                                onChange={(e) => console.log(e)}
                                error={''}
                            />
                        </div>

                        <div className='settings-input-cont'>
                            <Input 
                                label={'City'}
                                type={'text'}
                                onChange={(e) => console.log(e)}
                                error={''}
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
                        />
                    </div>

                    <div className='settings-input-cont'>
                        <Input 
                            label={'Set salary payment date'}
                            type={'date'}
                            onChange={(e) => console.log(e)}
                            error={''}
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
                            title={'Save Changes'}
                            textColor={'#fff'}
                            bgColor={'rgba(3, 166, 60, 1)'}
                            disabledColor={'rgba(3, 166, 60, 0.5)'}
                            disabled={true}
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