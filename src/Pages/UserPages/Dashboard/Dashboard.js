import React, {useState} from 'react';
import Layout from '../../../Components/Layout/Layout';
import AuxPageHead from '../../../Components/AuxPageHead/AuxPageHead';
import Modal from 'react-bootstrap/Modal';
import CustomButton from '../../../Components/Common/CustomButton/Index';
import Input from '../../../Components/Common/Input/Input';
import { fakeDB } from '../../../FakeDB/FakeDB-1';
import { InputListOne } from '../../../Components/Common/InputListOne/InputListOne';
import {FaRegPlusSquare} from 'react-icons/fa';
import {BsCheck2} from 'react-icons/bs'
import CustomSelector from '../../../Components/Common/CustomSelector/CustomSelector';
import SummaryCard from '../../../Components/Common/SummaryCard/SummaryCard';

import './Styles.css';

function Dashboard() {
  const [show, setShow] = useState(false);
  const [created, setCreated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Layout currentPage={'dashboard'}>
        <AuxPageHead 
          auxHeadTitle={'Overview'}
          auxHeadFilter={false}
          auxHeadBtnClick={handleShow}
          auxBtnTitle={'Add new employee'}
          auxBtnAppear={true}
          auxBtnIcon={
            <FaRegPlusSquare 
              style={{
                marginLeft: 5, 
                color: '#fff',
              }} 
            />
          }
        />
        
        <SummaryCard data={fakeDB} />

        <Modal 
          show={show} 
          onHide={handleClose}
          size={'xl'}
          centered
        >
         {
          !created ? (
            <>
              <p className='dashboard-card-text' style={{fontSize: 20, paddingTop: 20, paddingLeft: 15}}>
                  Add a new employee
              </p>

              <div className='employee-form-cont'>
                <div className='employee-form-input-cont'>
                  <CustomSelector
                    label={'Select Employment type*'}
                    options={['Temporary', 'Permanent', 'Contract']}
                  />
                </div>
                {
                  InputListOne.map((input) => (
                    <div key={input.id} className='employee-form-input-cont'>
                      <Input  
                        label={input.label}
                        type={input.type}
                        onChange={input.onChange}
                        error={input.error}
                      />
                    </div>
                  ))
                }
              </div>

              <Modal.Footer>
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}> 
                  <p onClick={handleClose} style={{color: '#EB5757', fontWeight: '500', cursor: 'pointer'}}>
                    Close
                  </p>
          
                  <div style={{width: 80}}>
                    <CustomButton 
                      btnHeight={44}
                      onClick={() => setCreated(true)}
                      title={'Add'}
                      textColor={'#fff'}
                      bgColor={'rgba(3, 166, 60, 1)'}
                      disabled={true}
                      disabledColor={'rgba(3, 166, 60, 0.5)'}
                    />
                  </div>
                </div>
              </Modal.Footer>
            </>
          ) : (
            <div className='success-employee-body'>
              <div className='success-employee-check-cont'>
                  <BsCheck2 style={{fontSize: 150, color: '#03A63C',}}  />
              </div>

              <p className='success-emplyee-title'>
                Employee Successfully Added
              </p>

              <p className='success-emplyee-text'>
                  Go to account
              </p>
            </div>   
          )
         }
        </Modal>
    </Layout>
  );
};

export default Dashboard;