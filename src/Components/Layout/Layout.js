import React from 'react';
import { Link } from 'react-router-dom';
import { 
    AiOutlineAppstore, 
    AiOutlineCreditCard 
} from 'react-icons/ai';
import { TbCapture } from 'react-icons/tb';
import { RiHandCoinLine } from 'react-icons/ri';
import {FiSettings} from 'react-icons/fi';
import { Image } from 'react-bootstrap';

import './Styles.css';

function Layout({
    children,
    currentPage
}) {
  return (
    <div className='layout-cont'>
        <div className='side-nav'>
            <div className='side-nav-logo-cont'>
                <Image 
                    src='assets/Logo.svg' 
                    alt="logo"
                    className='side-nav-logo' 
                />
            </div>

            <div className='side-nav-link-cont'>
                <Link 
                    className='side-nav-link'
                    style={{
                        color: currentPage === 'dashboard' ? 'rgba(3, 166, 60, 1)' : '#828282;',
                        background: currentPage === 'dashboard' ? 'rgba(235, 241, 237, 1)' : 'transparent'
                    }}
                    to={'/dashboard'}
                >
                    <AiOutlineAppstore style={{marginRight: 10, fontSize: 20}} />
                    Dashboard
                </Link>

                <Link 
                    className='side-nav-link'
                    style={{
                        color: currentPage === 'transactions' ? 'rgba(3, 166, 60, 1)' : '#828282;',
                        background: currentPage === 'transactions' ? 'rgba(235, 241, 237, 1)' : 'transparent'
                    }}
                    to={'/transactions'}
                >
                    <AiOutlineCreditCard style={{marginRight: 10, fontSize: 20}} />
                    Transactions
                </Link>

                <Link 
                    className='side-nav-link'
                    style={{
                        color: currentPage === 'accounts' ? 'rgba(3, 166, 60, 1)' : '#828282;',
                        background: currentPage === 'accounts' ? 'rgba(235, 241, 237, 1)' : 'transparent'
                    }}
                    to={'/accounts'}
                >
                    <TbCapture style={{marginRight: 10, fontSize: 20}} />
                    Accounts
                </Link>
                
                <Link 
                    className='side-nav-link'
                    style={{
                        color: currentPage === 'payment' ? 'rgba(3, 166, 60, 1)' : '#828282;',
                        background: currentPage === 'payment' ? 'rgba(235, 241, 237, 1)' : 'transparent'
                    }}
                    to={'/payment'}
                >
                    <RiHandCoinLine style={{marginRight: 10, fontSize: 20}} />
                    Payment
                </Link>

                <Link 
                    className='side-nav-link'
                    style={{
                        color: currentPage === 'settings' ? 'rgba(3, 166, 60, 1)' : '#828282;',
                        background: currentPage === 'settings' ? 'rgba(235, 241, 237, 1)' : 'transparent'
                    }}
                    to={'/settings'}
                >
                    <FiSettings style={{marginRight: 10, fontSize: 20}} />
                    Settings
                </Link>
            </div>
        </div>
        <div className='main-body'>
            <div className='head-nav'>
               <div className='menu-box'>
                
               </div> 
            </div>
            <div className='children-body'>
                {children}
            </div>
        </div>
    </div>
  );
};

export default Layout;