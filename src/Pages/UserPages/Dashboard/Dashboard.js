import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../../Components/Layout/Layout';
import AuxPageHead from '../../../Components/AuxPageHead/AuxPageHead';
import Modal from 'react-bootstrap/Modal';
import CustomButton from '../../../Components/Common/CustomButton/Index';
import Input from '../../../Components/Common/Input/Input';
import { InputListOne } from '../../../Components/Common/InputListOne/InputListOne';
import {FaRegPlusSquare} from 'react-icons/fa';
import {BsCheck2} from 'react-icons/bs'
import CustomSelector from '../../../Components/Common/CustomSelector/CustomSelector';
import SummaryCard from '../../../Components/Common/SummaryCard/SummaryCard';
import './Styles.css';
import LoaderScreen from '../../../Components/Common/LoaderScreen/LoaderScreen';
import axiosInstance from '../../../Utils/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const businessData = useSelector(state => state.businessData);
  const [show, setShow] = useState(false);
  const [created, setCreated] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loaderText, setLoaderText] = useState('');
  const [stats, setStats] = useState({
    totalEarnedThisMonth: 0,
    totalWithdrawn: 0,
    pendingBalance: 0,
    totalStaff: 0,
    activeStaffs: 0,
    inactiveStaffs: 0
  });

  const {business} = businessData;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onEnterValue = ({name, value}) => {
    setForm({...form, [name]: value});

    if(value !== '') {

      if(name === 'firstName') {

        if(value.length < 3) {
          setErrors(prev => {return {...prev, [name]: `First name should be a minimum of 3 characters`}});
        } else {
          setErrors(prev => {return {...prev, [name]: null}});
        };

      } else if (name === 'role') {

        if(value.length < 2) {
          setErrors(prev => {return {...prev, [name]: `Select an employment type`}});
        } else {
          setErrors(prev => {return {...prev, [name]: null}});
        };

      } else if (name === 'middleName') {

        if(value.length < 3) {
          setErrors(prev => {return {...prev, [name]: `Middle name should be a minimum of 3 characters`}});
        } else {
          setErrors(prev => {return {...prev, [name]: null}});
        };

      } else if (name === 'lastName') {

        if(value.length < 3) {
          setErrors(prev => {return {...prev, [name]: `Surname name should be a minimum of 3 characters`}});
        } else {
          setErrors(prev => {return {...prev, [name]: null}});
        };

      } else if (name === 'phone') {

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
        
      } else if (name === 'email') {

        const regex = new RegExp (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
        const isEmailValid = regex.test(value);

        if(value.length < 12 || !isEmailValid) {
            setErrors(prev => {return {...prev, [name]: `Email should be properly formated`}});
        } else {
            setErrors(prev => {return {...prev, [name]: null}});
        };

      } else if (name === 'salary') {

        if(value.length < 2) {
          setErrors(prev => {return {...prev, [name]: `Enter salary`}});
        } else {
          setErrors(prev => {return {...prev, [name]: null}});
        };

      } else if (name === 'startDate') {

        if(!value) {
          setErrors(prev => {return {...prev, [name]: `Enter date`}});
        } else {
          setErrors(prev => {return {...prev, [name]: null}});
        };

      }

    } else {
      setErrors(prev => {return {...prev, [name]: `This field is required`}});
    }
  }

  const getErrors = (label) => {
    for(const key in errors) {
      if(label === key) {
        return errors[key];
      }
    }
  };

  const formatMyDate = (value) => {
    let formatedDate = [];
    let arr = [];
    formatedDate.push(value.split("-")[0]);
    formatedDate.push(value.split("-")[1]);
    formatedDate.push(value.split("-")[2]);
    arr.push(formatedDate[2]);
    arr.push(formatedDate[1]);
    arr.push(formatedDate[0]);
    let properDate = arr.join("-");
    return properDate;
  };

  const onSubmit = async() => {
    setLoaderText('Creating staff');
    setLoading(true);
    try {
      const res = await axiosInstance({
        url: '/business/create-staff',
        method: 'POST',
        data: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          salary: form.salary,
          role: form.role,
          businessId: business.id,
          startDate: formatMyDate(form.startDate)
        }
      })
      const{message} = res.data;
      // console.log('res ', res);
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT
      });
      setLoading(false);
      setCreated(true);
      return(<ToastContainer />)
    } catch(error) {
      setLoading(false);
      // console.log('err ', error.message);
      const err = error.response.data.message
      toast.error(err, {
        position: toast.POSITION.TOP_RIGHT
      })
      return(<ToastContainer />)
    }
  };

  const getBusinessStats = async() => {
    setLoaderText('Fetching stats');
    setLoading(true);
    try {
      const res = await axiosInstance({
        url: '/business/stats',
        method: 'GET'
      });
      const {data, message} = res.data;
      setStats(data);
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

  useEffect(() => {
    if(Object.keys(business).length > 0) {
      getBusinessStats();
    } 
  }, [business])

  if(loading) {
    return(<LoaderScreen loadingText={loaderText} />)
  }

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
        
        <SummaryCard data={stats} />

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
                    options={['regular']}
                    onChange={(e) => {
                      const value = e.target.value;
                      onEnterValue({name: 'role', value})
                    }}
                    error={errors.employmentType}
                  />
                </div>
                {
                  InputListOne.map((input) => {
                    const {label, id, type, tag} = input;
                    return (
                      <div key={id} className='employee-form-input-cont'>
                        <Input  
                          label={label}
                          type={type}
                          onChange={(e) => {
                            const value = e.target.value;
                            onEnterValue({name: tag, value});
                            getErrors(tag);
                          }}
                          error={getErrors(tag)}
                        />
                      </div>
                    )
                  })
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
                      onClick={onSubmit}
                      title={'Add'}
                      textColor={'#fff'}
                      bgColor={'rgba(3, 166, 60, 1)'}
                      disabled={false}
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

              <p 
                style={{cursor: 'pointer'}} 
                onClick={() => {
                  handleClose(); 
                  setCreated(false);
                  getBusinessStats();
                }} 
                className='success-emplyee-text'
              >
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