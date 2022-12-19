import React from 'react';
import './styles.css';
import { useLottie } from 'lottie-react';
import LoaderAnim from './96898-loader-animation.json'

function LoaderScreen({loadingText}) {
   const options = {
    animationData: LoaderAnim,
    loop: true
  };

  const { View } = useLottie(options);

  return (
    <div className='loader-screen'>
       <div className="loader-sub-screen">
          <p className='head-text'>{loadingText && loadingText}</p>
          {View}
          {/* <div className="loader"></div> */}
       </div>
    </div>
  )
};

export default LoaderScreen;