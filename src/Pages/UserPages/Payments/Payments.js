import React, {useState, useEffect} from 'react';
import AuxPageHead from '../../../Components/AuxPageHead/AuxPageHead';
import Layout from '../../../Components/Layout/Layout';
import SummaryCard from '../../../Components/Common/SummaryCard/SummaryCard';
import { debtDB } from '../../../FakeDB/debtDB';
import CustomTableTwo from '../../../Components/Common/CustomTableTwo/CustomTableTwo';
import { PaymentDB } from '../../../FakeDB/PaymentDB';
import '../Accounts/Styles.css'
import '../../../Components/Common/SummaryCard/Styles.css'
import axiosInstance from '../../../Utils/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderScreen from '../../../Components/Common/LoaderScreen/LoaderScreen';
import getSymbolFromCurrency from 'currency-symbol-map';
import {BsExclamationSquare} from 'react-icons/bs';

function Payments() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaderText, setLoaderText] = useState('');
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({
    totalEarnedThisMonth: 0,
    totalWithdrawn: 0,
    pendingBalance: 0,
    totalStaff: 0,
    activeStaffs: 0,
    inactiveStaffs: 0
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const getPaymentHistory = async() => {
    setLoaderText('Fetching payments');
    setLoading(true);
    try {
      const res = await axiosInstance({
        url: '/business/payment-history',
        method: 'GET'
      });
      const {data, message} = res.data;
      setPayments(data);
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
    getBusinessStats();
    getPaymentHistory();
  }, [])

  if(loading) {
    return(<LoaderScreen loadingText={loaderText} />)
  }

  return (
    <Layout currentPage={'payments'}>
        <AuxPageHead 
          auxHeadFilter={false}
          auxHeadTitle={'Payments'}
          auxHeadBtnClick={handleShow}
          auxBtnTitle={'Download Invoice'}
          auxBtnAppear={true}
        />

        <div className='dashboard-card-cont'>
          <div 
           className='dashboard-card'
          >
          <div className='dashboard-card-head'>
            <p className='dashboard-card-text' style={{color: '#C30000'}} >
              <span style={{marginRight: 5}}>{(getSymbolFromCurrency('NGN'))}</span>
              <span>
                {
                  stats.pendingBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              </span>
            </p>

              <p 
                className='dashboard-card-icon-cont'
                style={{backgroundColor: 'rgba(211, 56, 56, 0.1)'}}
              > 
                <BsExclamationSquare style={{fontSize: 20, color: '#C30000'}} />
              </p>
            </div>

            <p className='dashboard-card-text-2'>
              Pending Balance
            </p>
          </div> 
        </div>

        <div className='transaction-dashboard'>
          {
            payments.length < 1 ? (
              <p className='empty-state-text'>
               No Payments made yet 
              </p>
            ) : (
              <CustomTableTwo data={payments} />
            )
          }
        </div>
    </Layout>
  );
};

export default Payments;