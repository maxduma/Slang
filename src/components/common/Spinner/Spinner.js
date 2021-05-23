import React from 'react';
import c from './Spinner.module.css';
import spinner from '../../../assets/Spinner.gif';

const Spinner = () => {
    return (
      <div className={c.spinnerWrapper}>
        <img src={spinner} alt={spinner}/>
      </div>
    )
}

export default Spinner;


