import React from 'react';
import { Spinner as FlowbiteSpinner } from 'flowbite-react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-6">
      <FlowbiteSpinner color="pink" aria-label="Loading..." />
    </div>
  );
};

export default Spinner;
