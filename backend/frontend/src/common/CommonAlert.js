
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const CommonAlert = ({ title, text, icon = 'info', confirmButtonText = 'Ok', onConfirm }) => {
  const showAlert = () => {
    MySwal.fire({
      title: <p>{title}</p>,
      text: text,
      icon: icon,
      confirmButtonText: confirmButtonText,
    }).then((result) => {
      if (result.isConfirmed && onConfirm) {
        onConfirm();  // Callback after confirmation
      }
    });
  };

  useEffect(()=>{
    showAlert()
  })

  return (
    <div>
     
    </div>
  );
};

export default CommonAlert;
