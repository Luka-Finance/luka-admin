import React from 'react';
import {BiWallet} from 'react-icons/bi';
import {BsCheckLg, BsExclamationSquare} from 'react-icons/bs';
import {HiUsers} from 'react-icons/hi';
import getSymbolFromCurrency from 'currency-symbol-map';

import './Styles.css';

function SummaryCard({data}) {
  return (
    <div className='dashboard-card-cont'>
          {
            data.map((cur,index) => (
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
  );
};

export default SummaryCard;