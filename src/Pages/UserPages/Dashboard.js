import React, {useState} from 'react';
import Layout from '../../Components/Layout/Layout';
import AuxPageHead from '../../Components/AuxPageHead/AuxPageHead';
import {BiWallet} from 'react-icons/bi';
import {BsCheckLg, BsExclamationSquare} from 'react-icons/bs';
import {HiUsers} from 'react-icons/hi';
import getSymbolFromCurrency from 'currency-symbol-map';
import Modal from 'react-bootstrap/Modal';
import CustomButton from '../../Components/Common/CustomButton/Index';
import Input from '../../Components/Common/Input/Input';

import './Styles.css';

function Dashboard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fakeDB = [
    {
      amount: 632259,
      icon: 'BiWallet',
      text: 'Total earned this month',
      pending: false,
      count: 0,
    },
    {
      amount: 632259,
      icon: 'BsCheckLg',
      text: 'Total Withdrawn',
      pending: false,
      count: 0,
    },
    {
      amount: 632259,
      icon: 'BsExclamationSquare',
      text: 'Pending Balance',
      pending: true,
      count: 0,
    },
    {
      amount: 0,
      icon: 'HiUsers',
      text: 'Total Employee',
      pending: false,
      count: 188,
    },
    {
      amount: 0,
      icon: 'HiUsers',
      text: 'Active Employee',
      pending: false,
      count: 109,
    },
    {
      amount: 0,
      icon: 'HiUsers',
      text: 'Inactive Employee',
      pending: false,
      count: 79,
    },
  ];

  return (
    <Layout currentPage={'dashboard'}>
        <AuxPageHead 
          auxHeadTitle={'Overview'}
          auxHeadFilter={false}
          auxHeadBtnClick={handleShow}
        />
        
        <div className='dashboard-card-cont'>
          {
            fakeDB.map((cur,index) => (
              <div 
                className='dashboard-card'
                key={index}
              >
                <div className='dashboard-card-head'>
                  <p className='dashboard-card-text' style={{color: cur.pending ? '#C30000' : '#000'}} >
                    <span style={{marginRight: 5}}>{cur.amount > 0 && (getSymbolFromCurrency('NGN'))}</span>
                    <span>
                      {
                        cur.amount > 0 ? 
                        (cur.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) 
                        : (cur.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                      }
                    </span>
                  </p>

                  <p 
                    className='dashboard-card-icon-cont'
                    style={{backgroundColor: cur.pending ? 'rgba(211, 56, 56, 0.1)' : 'rgba(3, 166, 60, 0.1)'}}
                  >
                    {
                      cur.icon === 'BiWallet' ? (<BiWallet style={{fontSize: 20, color: cur.pending ? '#C30000' : '#03A63C'}} />) : 
                      cur.icon === 'BsCheckLg' ? (<BsCheckLg style={{fontSize: 20, color: cur.pending ? '#C30000' : '#03A63C'}} />) :
                      cur.icon === 'BsExclamationSquare'? (<BsExclamationSquare style={{fontSize: 20, color: cur.pending ? '#C30000' : '#03A63C'}} />) :
                      cur.icon === 'HiUsers' ? (<HiUsers style={{fontSize: 20, color: cur.pending ? '#C30000' : '#03A63C'}} />) : (<div></div>)
                    }
                  </p>
                </div>

                <p className='dashboard-card-text-2'>
                    {cur.text}
                </p>
              </div>
            ))
          }
        </div>

        <Modal 
          show={show} 
          onHide={handleClose}
          size={'lg'}
          centered
        >
          <p className='dashboard-card-text' style={{fontSize: 20, paddingTop: 20, paddingLeft: 15}}>
            Add a new employee
          </p>

          <div className='employee-form-cont'>
            <div className='employee-form-input-cont'>
              <Input  
                label={'First Name*'}
                type={'text'}
                onChange={(e) => {console.log(e.target.value)}}
                error={''}
              />
            </div>

            <div className='employee-form-input-cont'>
              <Input  
                label={'Last Name*'}
                type={'text'}
                onChange={(e) => {console.log(e.target.value)}}
                error={''}
              />
            </div>

            <div className='employee-form-input-cont'>
              <Input  
                label={'Surname*'}
                type={'text'}
                onChange={(e) => {console.log(e.target.value)}}
                error={''}
              />
            </div>

            <div className='employee-form-input-cont'>
              <Input  
                label={'Phone*'}
                type={'tel'}
                onChange={(e) => {console.log(e.target.value)}}
                error={''}
              />
            </div>

            <div className='employee-form-input-cont'>
              <Input  
                label={'Email*'}
                type={'email'}
                onChange={(e) => {console.log(e.target.value)}}
                error={''}
              />
            </div>

            <div className='employee-form-input-cont'>
              <Input  
                label={'Net Salary*'}
                type={'text'}
                onChange={(e) => {console.log(e.target.value)}}
                error={''}
              />
            </div>

            <div className='employee-form-input-cont'>
              <Input  
                label={'Employment Start Date*'}
                type={'date'}
                onChange={(e) => {console.log(e.target.value)}}
                error={''}
              />
            </div>
          </div>

          <Modal.Footer>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}> 
              <p onClick={handleClose} style={{color: '#EB5757', fontWeight: '500', cursor: 'pointer'}}>
                Close
              </p>
      
              <div style={{width: 80}}>
                <CustomButton 
                  onClick={handleClose}
                  title={'Add'}
                  textColor={'#fff'}
                  bgColor={'rgba(3, 166, 60, 1)'}
                  disabled={true}
                  disabledColor={'rgba(3, 166, 60, 0.5)'}
                />
              </div>
            </div>
          </Modal.Footer>
        </Modal>
    </Layout>
  );
};

export default Dashboard;