import React, {useState} from 'react';
import AuxPageHead from '../../../Components/AuxPageHead/AuxPageHead';
import Layout from '../../../Components/Layout/Layout';
import SummaryCard from '../../../Components/Common/SummaryCard/SummaryCard';
import { debtDB } from '../../../FakeDB/debtDB';
import CustomTableTwo from '../../../Components/Common/CustomTableTwo/CustomTableTwo';
import { PaymentDB } from '../../../FakeDB/PaymentDB';

import '../Accounts/Styles.css'

function Payments() {
  const [show, setShow] = useState(false);
  // const [payments, setPayments] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Layout currentPage={'payments'}>
        <AuxPageHead 
          auxHeadFilter={false}
          auxHeadTitle={'Payments'}
          auxHeadBtnClick={handleShow}
          auxBtnTitle={'Download Invoice'}
          auxBtnAppear={true}
        />

        <SummaryCard data={debtDB} />

        <div className='transaction-dashboard'>
          {
            PaymentDB.length < 1 ? (
              <p className='empty-state-text'>
               No Payments made yet 
              </p>
            ) : (
              <CustomTableTwo data={PaymentDB} />
            )
          }
        </div>
    </Layout>
  );
};

export default Payments;