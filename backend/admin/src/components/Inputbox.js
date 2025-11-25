import React from 'react';

function Inputbox(props) {
  const { type, placeholder, value, name, id, className, onchangeFun } = props;
  return (
    <input className={className} type={type} name={name} placeholder={placeholder} value={value} id={id} onChange={(e) => onchangeFun(e)} />
  );
}

export default Inputbox;
