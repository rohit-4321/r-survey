import { useState } from 'react';
import axiosInstance from '../../api/axios';

export const Dashboard = () => {
  const [value, setValue] = useState(0);
  // const user = useUserContext();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sendRequest = () => {
    firebaseAuth.currentUser?.getIdToken(true)
      .then((tk) => {
        axiosInstance({
          method: 'get',
          url: '/loguser',
          headers: {
            'Authorization': `Bearer ${tk}`
          }
        }).then(() => {
          console.log('SUccessfull');
        }).catch(() => {
          console.log('failed');
        });
      })
      .catch(() => {
        console.log('Error on getting token');
      });
  };

  return <div>
    <button onClick={() => {
      setValue(value + 1);
    }}>
      Reuqest
    </button>
  </div>;
};

