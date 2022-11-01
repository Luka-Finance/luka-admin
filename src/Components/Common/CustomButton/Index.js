import React from 'react';

import './styles.css'

function Index({
    title,
    textColor,
    bgColor,
    disabledColor,
    disabled,
    onClick,
    icon,
    btnHeight
}) {
  return (
    <div 
        className='btn-wrapper'
        onClick={onClick}
        style={{
            background: !disabled ? bgColor : disabledColor,
            height: !btnHeight ? 66 : btnHeight, 
        }}
    >
        <p
            className='btn-text'
            style={{color: textColor}}
        >
            {title}
        </p>
        {icon && (<h5>{icon}</h5>)}
    </div>
  )
};

export default Index;