import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import { 
    AiOutlineAppstore, 
    AiOutlineCreditCard,
    AiOutlineClose 
} from 'react-icons/ai';
import { TbCapture } from 'react-icons/tb';
import { RiHandCoinLine, RiNotification2Fill } from 'react-icons/ri';
import {FiSettings} from 'react-icons/fi';
import {BsChevronDown, BsChevronUp} from 'react-icons/bs';
import {BiMenuAltRight} from 'react-icons/bi';
import { Image } from 'react-bootstrap';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

import './Styles.css';

function Layout({
    children,
    currentPage
}) {
    const [mobileNav, setMobileNav] = useState(false);
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
  
    const handleClick = (event) => {
      setShow(!show);
      setTarget(event.target);
    };

    const navList =[
        'Dashboard',
        'Transactions',
        'Accounts',
        'Payment',
        'Settings'
    ]
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
                {
                    navList.map((link, index) => (
                        <Link
                            key={index} 
                            className='side-nav-link'
                            style={{
                                color: currentPage.toLowerCase() === link.toLowerCase() ? 'rgba(3, 166, 60, 1)' : '#828282',
                                background: currentPage.toLowerCase() === link.toLowerCase() ? 'rgba(235, 241, 237, 1)' : 'transparent'
                            }}
                            to={`/${link.toLowerCase()}`}
                        >
                            {
                                link.toLowerCase() === 'dashboard' ? (
                                    <AiOutlineAppstore style={{marginRight: 10, fontSize: 20}} />
                                ) :
                                link.toLowerCase() === 'transactions' ? (
                                    <AiOutlineCreditCard style={{marginRight: 10, fontSize: 20}} /> 
                                ) :
                                link.toLowerCase() === 'accounts' ? (
                                    <TbCapture style={{marginRight: 10, fontSize: 20}} /> 
                                ) :
                                link.toLowerCase() === 'payment' ? (
                                    <RiHandCoinLine style={{marginRight: 10, fontSize: 20}} />
                                ) : 
                                link.toLowerCase() === 'settings' ? (
                                    <FiSettings style={{marginRight: 10, fontSize: 20}} />
                                ) : (<div></div>)

                            }
                            {link}
                        </Link> 
                    ))
                }
            </div>
        </div>
        <div className='main-body'>
            <div className='head-nav'>
                <div className='head-nav-logo-cont'>
                    <Image 
                        src='assets/Logo.svg' 
                        alt="logo"
                        className='head-nav-logo' 
                    />
                </div>

               <div ref={ref} className='menu-box'>

                    <div className='bell-cont'>
                        <div className='bell-badge'></div>
                        <RiNotification2Fill style={{fontSize: 20, color: '#C5C7CD'}} />
                    </div>

                    <div 
                        className='nav-profile'
                        onClick={handleClick}
                    >
                        <Image 
                            src='assets/place-holder/profile-circle.svg' 
                            alt='profile picture'
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: '50%'
                            }}
                        />

                        <p className='profile-name'>
                            Ikebe inc
                        </p>

                        {
                            !show ? (
                                <BsChevronDown />
                            ) : (
                                <BsChevronUp />
                            )
                        }

                    </div>

                    <Overlay
                        show={show}
                        target={target}
                        placement="bottom"
                        container={ref}
                        containerPadding={20}
                    >
                        <Popover id="popover-contained">
                        <Popover.Header as="h3">Profile</Popover.Header>
                        <Popover.Body>
                            <strong>Do something</strong> not entirely sure.
                        </Popover.Body>
                        </Popover>
                    </Overlay>


                    <div 
                        className='mobile-nav-btn-cont'
                        onClick={() => setMobileNav(true)}
                    >
                        <BiMenuAltRight  
                            style={{
                                color: 'rgba(3, 166, 60, 1)',
                                fontSize: 30,
                            }}
                        />
                    </div>
               </div> 
            </div>
            <div className='children-body'>
                {children}
            </div>
        </div>
        {
            mobileNav && (
                <div className='mobile-nav'>
                    <div className='mobile-nav-list'>
                        {
                            navList.map((link, index) => (
                                <Link
                                    key={index} 
                                    className='mobile-nav-link'
                                    style={{
                                        color: currentPage.toLowerCase() === link.toLowerCase() ? 'rgba(3, 166, 60, 1)' : '#fff',
                                    }}
                                    to={`/${link.toLowerCase()}`}
                                >
                                    {link}
                                </Link> 
                            ))
                        }
                    </div>

                    <div 
                        className='mobile-nav-close-cont'
                        onClick={() => setMobileNav(false)}
                    >
                        <AiOutlineClose style={{fontSize: 30, color: '#fff'}} />
                    </div>
                </div>
            )
        }
    </div>
  );
};

export default Layout;