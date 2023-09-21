import { useState } from 'react';

export const Dashboard = () => {
  const [value, setValue] = useState(0);

  const sendRequest = () => {
  };

  return <div>
    <button onClick={() => {
      setValue(value + 1);
    }}>
      Reuqest
    </button>
  </div>;
};

