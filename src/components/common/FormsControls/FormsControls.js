import React from 'react';
import { Field } from 'redux-form';
import c from './FormsControls.module.css';

export const Textarea = (props) => {
  const {input, child, ...restProps} = props;
  return  <FromControl {...props}><textarea {...input} {...restProps} className={c.textarea} cols="50" rows="2"/></FromControl> 
}
export const Input = (props) => {
  const {input, child, ...restProps} = props;
  return  <FromControl {...props}><input {...input} {...restProps} className={c.input} /></FromControl> 
}

const FromControl = ({input, meta, child, ...props}) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={c.formControl + " " + (hasError ? c.error : " ")}>
       <div>
         {props.children}
       </div>
      <div>
        { hasError && <span>{meta.error}</span> }
      </div>
    </div>
  )
}


// export const Textarea = ({input, meta, ...props}) => {
//   const hasError = meta.touched && meta.error;
//   return (
//     <div className={c.formControl + " " + (hasError ? c.error : " ")}>
//       <textarea {...input} {...props} />
//       { hasError && <span>{meta.error}</span> }
//     </div>
//   )
// }

// export const Input = ({input, meta, ...props}) => {
//   const hasError = meta.touched && meta.error;
//   return (
//     <div className={c.formControl + " " + (hasError ? c.error : " ")}>
//       <input {...input} {...props} />
//       { hasError && <span>{meta.error}</span> }
//     </div>
//   )
// }