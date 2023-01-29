import React, { useState } from 'react';
import './styles.css';
import CustomButton from '../../../../Components/Common/CustomButton/Index';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { RiBankLine } from 'react-icons/ri';
import { Dropdown } from 'react-bootstrap';
import { FiChevronDown } from 'react-icons/fi';
import Form from 'react-bootstrap/Form';

function PaymentMethod({accDetails, closeModal}) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [expire, setExpire] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState(0);

  const handleCardDisplay = () => {
        const rawText = [...cardNum.split(' ').join('')] // Remove old space
        const creditCard = [] // Create card as array
        rawText.forEach((t, i) => {
            if (i % 4 === 0 && i !== 0) creditCard.push(' ') // Add space
            creditCard.push(t)
        })
        return creditCard.join('') // Transform card array to string
   }

   function cc_expires_format() {
        return expire.replace(
            /[^0-9]/g, '' // To allow only numbers
        ).replace(
            /^([2-9])$/g, '0$1' // To handle 3 > 03
        ).replace(
            /^(1{1})([3-9]{1})$/g, '0$1/$2' // 13 > 01/3
        ).replace(
            /^0{1,}/g, '0' // To handle 00 > 0
        ).replace(
            /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, '$1/$2' // To handle 113 > 11/3
        );
    }

  return (
    <div className='payment-method-parent'>
        <div className='payment-method-head'>
            <p>Refund Pending Balance</p>
        </div>

        <div className='payment-method-body'>
            <div className='sub-cont'>
                <p className='payment-method-title'>Select payment method</p>
                <Form.Select onChange={(e) => setPaymentMethod(e.target.value)} style={{height: 50}} aria-label="Default select example">
                    <option>Select payment method</option>
                    {/* <option value="card">
                        <span> <AiOutlineCreditCard style={{color: '#333', fontSize: 15}} /> </span>
                        <span className='selector-opt-text'> Pay with card </span>
                    </option> */}
                    <option value="transfer">
                        <span> <RiBankLine style={{color: '#333', fontSize: 15}} /> </span>
                        <span className='selector-opt-text'> Pay through card transfer </span>
                    </option>
                </Form.Select>

                {
                    paymentMethod === 'card' ? (
                        <div className='method-cont'>
                            <input
                                type={'text'}
                                maxLength={19}
                                value={handleCardDisplay()}
                                placeholder='Card number' 
                                className='method-input'
                                onChange={(e) => setCardNum(e.target.value)}
                            />

                            <div className='sub-method-cont'>
                                <input
                                    type={'text'}
                                    maxLength={5}
                                    value={cc_expires_format()}
                                    placeholder='Expiry date' 
                                    className='method-input2'
                                    onChange={(e) => setExpire(e.target.value)}
                                />

                                <input
                                    type={'text'}
                                    maxLength={3}
                                    placeholder='CVV' 
                                    className='method-input2'
                                    onChange={(e) => setCvv(e.target.value)}
                                />
                            </div>

                            <input
                                type={'number'}
                                placeholder='Amount' 
                                className='method-input'
                                onChange={(e) => setAmount(e.target.value)}
                            />  

                            <div style={{width: 385, margin: '50px auto auto auto',}}>
                                <CustomButton 
                                    btnHeight={66}
                                    textColor={'#fff'}
                                    bgColor={'#03A63C'}
                                    title={'Continue'}
                                    btnFontSize={20}
                                    disabledColor={'rgba(3, 166, 60, 0.5)'}
                                    disabled={(cardNum.length > 16 && expire.length > 4 && cvv.length > 3 && amount > 499) ? false : true}
                                />
                            </div>
                        </div>
                    ) : paymentMethod === 'transfer' ? (
                        <div className='method-cont'>
                            <p className='bank-details-title'>
                                Bank details
                            </p>

                            <div className='bank-details-sub-cont'>
                                <p className='bank-details-text'>Account name :</p>
                                <p className='bank-details-text'>{accDetails.accountName === "" ? "Luka Technologies LTD" : accDetails.accountName}</p>
                            </div>
                            <div className='bank-details-sub-cont'>
                                <p className='bank-details-text'>Account number :</p>
                                <p className='bank-details-text'>{accDetails.accountName === "" ? "5401656450" : accDetails.accountNumber}</p>
                            </div>
                            <div className='bank-details-sub-cont'>
                                <p className='bank-details-text'>Bank name :</p>
                                <p className='bank-details-text'>{accDetails.accountName === "" ? "Providus Bank" : accDetails.bankName}</p>
                            </div>

                            <div style={{width: 385, margin: '50px auto auto auto',}}>
                                <CustomButton 
                                    onClick={closeModal}
                                    btnHeight={66}
                                    textColor={'#fff'}
                                    bgColor={'#03A63C'}
                                    title={'Confirm payment'}
                                    btnFontSize={20}
                                    disabledColor={'rgba(3, 166, 60, 0.5)'}
                                    disabled={false}
                                />
                            </div>
                        </div>
                    ) : (
                        <div>
                        </div>
                    )
                }

            </div>
        </div>
    </div>
  )
};

export default PaymentMethod;