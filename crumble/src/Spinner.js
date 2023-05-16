import React from 'react';
import './Spinner.css';

const Spinner = ({ isLoading }) => {
  if (isLoading) {
    return <div className="spinner" />;
  } else {
    return null;
  }
};

export default Spinner;