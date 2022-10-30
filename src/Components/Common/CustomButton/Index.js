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
}) {
  return (
    <div 
        className='btn-wrapper'
        onClick={onClick}
        style={{
            background: !disabled ? bgColor : disabledColor
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