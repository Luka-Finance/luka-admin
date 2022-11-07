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
  const runAction = () => {
    if(!disabled) {
        onClick()
    } 
  }
  return (
    <div 
        className='btn-wrapper'
        onClick={runAction}
        style={{
            background: !disabled ? bgColor : disabledColor,
            height: !btnHeight ? 66 : btnHeight, 
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center'
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