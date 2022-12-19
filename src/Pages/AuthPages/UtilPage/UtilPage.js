import React from 'react';
import { useLottie } from 'lottie-react';
import zenLoader from './125746-meditating-man.json'

function UtilPage() {
  const options = {
    animationData: zenLoader,
    loop: true
  };

  const { View } = useLottie(options);

  return (
    <div>
      {View}
      <h1 
        style={{
          textAlign: 'center',
          color: 'rgba(113, 172, 133, 1)',
          padding: 10,
        }}
      >
        Seems like your device is too small to access our 
        awesome content. Please check back with atleast a tablet.
      </h1>
    </div>
  )
};

export default UtilPage;