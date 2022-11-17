import React from 'react';

const Error = ({errorName}) => {
  const errorMsg = errorName;

  return(
    <div className="w-full flex justify-center items-center"> 
      <h1 className="font-bold text-2xl mt-2 text-white"> {errorMsg?errorMsg:'Something went wrong. Please try again.'}</h1>
    </div>
  )
};

export default Error;
