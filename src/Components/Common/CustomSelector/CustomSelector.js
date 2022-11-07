import React from 'react';

import './Styles.css';

function CustomSelector({
  label,
  options,
  onChange,
  error,
}) {
  return (
    <div className='selector-cont'>
      <label htmlFor={label} className="selecttor-label">{label}</label>

      <div className='selector-wrapper'>
        <select onChange={onChange} name={label} id={label} className='selector-self'>
          <option value=""></option>
          {
            options.map((opt, index) => (
              <option value={opt} key={index}>
                {opt}
              </option>
            ))
          }
        </select>
      </div>
      {error && (<h5 className='error-text'>{error}</h5>)}
    </div>
  )
}

export default CustomSelector;