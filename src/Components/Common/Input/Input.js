import React from 'react';
import './styles.css';

function Input({
    label,
    type,
    placeholder,
    value,
    icon,
    error,
    onChange,
    iconClick
}) {
  return (
    <div className='input-cont'>
      {label && (<label htmlFor="label" className='input-label'>{label}</label>)}

      <div className='input-wrapper'>
        {icon && (<div style={{cursor: 'pointer'}} onClick={iconClick}>{icon}</div>)}

        <input
            className='input-self'
            type={type} 
            placeholder={placeholder ? placeholder : ''}
            id={label}
            value={value}
            onChange={onChange}
        />
      </div>

      {error && (<h5 className='error-text'>{error}</h5>)}
    </div>
  );
};

export default Input;