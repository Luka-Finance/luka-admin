import React from 'react';
import './styles.css';
function LoaderScreen({loadingText}) {
  return (
    <div className='loader-screen'>
       <div className="loader-sub-screen">
          <p className='head-text'>{loadingText && loadingText}</p>
          <div className="loader"></div>
       </div>
    </div>
  )
};

export default LoaderScreen;