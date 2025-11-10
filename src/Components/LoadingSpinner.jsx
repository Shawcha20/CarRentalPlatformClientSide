import React from 'react';
import { Bars } from 'react-loader-spinner';

const LoadingSpinner = ({ height = '100', width = '100' }) => {
  return (
    <div className="flex justify-center items-center py-20">
      <Bars
        height={height}
        width={width}
        color="#FF6B6B"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default LoadingSpinner;



