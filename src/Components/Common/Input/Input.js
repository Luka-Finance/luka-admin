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
    iconClick,
    disableInput,
    maxLength,
    maxDate,
    inputHt
}) {
  return (
    <div className='input-cont'>
      {label && (<label htmlFor="label" className='input-label'>{label}</label>)}

      <div style={{backgroundColor: disableInput ? '#E8E5E5' : '#F7F7F7'}} className='input-wrapper'>
        {icon && (<div style={{cursor: 'pointer', backgroundColor: disableInput ? '#E8E5E5' : '#F7F7F7' }} onClick={iconClick}>{icon}</div>)}

        <input
            style={{height: !inputHt ? 55 : inputHt }}
            className='input-self'
            type={type} 
            placeholder={placeholder ? placeholder : ''}
            id={label}
            value={value}
            onChange={onChange}
            readOnly={disableInput && disableInput}
            maxLength={maxLength && maxLength}
            max={maxDate && maxDate}
        />
      </div>

      {error && (<h5 className='error-text'>{error}</h5>)}
    </div>
  );
};

export default Input;