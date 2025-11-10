import React, { useState } from 'react';

const TruncatedMessage = ({ text = '', maxLength = 3 }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncation = () => {
    setIsTruncated(!isTruncated);
  };

  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  return (
    <span>
      {isTruncated ? `${text.slice(0, maxLength)}...` : text}
      <button onClick={toggleTruncation} className="btn btn-link p-0" style={{ textDecoration: 'underline', color: 'blue' }}>
        {isTruncated ? 'Show more' : 'Show less'}
      </button>
    </span>
  );
};

export default TruncatedMessage;
