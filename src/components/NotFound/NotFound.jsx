import React from 'react'
import c from './NotFound.module.css';

const NotFound = (props) => {
  return (
    <div className={c.wrapper}>
      <div className={c.titleWrapper}>
        <h1 className={c.title}>404 Not Found</h1>
      </div>
    </div>
  )
};
export default NotFound;