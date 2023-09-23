import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || token == ''){
      navigate('/auth');
    }
  }, []);
  return <div>
    <button onClick={() => {
      setValue(value + 1);
    }}>
      Reuqest
    </button>
  </div>;
};

