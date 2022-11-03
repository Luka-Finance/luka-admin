import React from 'react';
import AuxPageHead from '../../../Components/AuxPageHead/AuxPageHead';
import Layout from '../../../Components/Layout/Layout';
import Input from '../../../Components/Common/Input/Input';
import CustomSelector from '../../../Components/Common/CustomSelector/CustomSelector';
import {BsCloudArrowUp, BsExclamationCircle} from 'react-icons/bs';
import CustomButton from '../../../Components/Common/CustomButton/Index';

import './Styles.css';

function Settings() {
  return (
    <Layout currentPage={'settings'}>
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
                            onChange={(e) => console.log(e)}
                            error={''}
                        />
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
                        <CustomSelector />
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
                        <spaan>
                            <BsExclamationCircle 
                                style={{
                                    color: '#03A63C',
                                    marginBottom: 20,
                                    marginRight: 10
                                }} 
                            />
                        </spaan>

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