import React, {useState, useEffect} from 'react';
import AuxPageHead from '../../../Components/AuxPageHead/AuxPageHead';
import Layout from '../../../Components/Layout/Layout';
import CustomSelector from '../../../Components/Common/CustomSelector/CustomSelector';
import CustomButton from '../../../Components/Common/CustomButton/Index';
import { Modal } from 'react-bootstrap';
import { InputListOne } from '../../../Components/Common/InputListOne/InputListOne';
import Input from '../../../Components/Common/Input/Input';
import { fakeDBTwo } from '../../../FakeDB/fakeDB-2';
import CustomTable from '../../../Components/Common/CustomTable/CustomTable';
import {FaRegPlusSquare} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import LoaderScreen from '../../../Components/Common/LoaderScreen/LoaderScreen';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../Utils/axiosInstance';

import './Styles.css';

function Accounts() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [accounts, setAccounts] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getStaffs = async() => {
    setLoading(true);
    try {
      const res = await axiosInstance({
        url: '/staffs',
        method: 'GET',
      })
      console.log(res);
      setLoading(false);
    }catch(error) {
      setLoading(false);
      console.log('err ', error.message);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT
      })
      return(<ToastContainer />)
    }
  }

  useEffect(() => {
    getStaffs();
  }, [])

  if(loading) {
    return (<LoaderScreen loadingText={'fetching accounts'} />)
  }

  return (
    <Layout currentPage={'accounts'}>
      {/* for toast notification containing */}
      <ToastContainer />

        <AuxPageHead 
          auxHeadFilter={true}
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

        <div className='transaction-dashboard'>
          {
            fakeDBTwo.length < 1 ? (
              <p className='empty-state-text'>
               No Employee Registered yet 
              </p>
            ) : (
              <CustomTable data={fakeDBTwo} />
            )
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
              <CustomSelector />
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

export default Accounts;