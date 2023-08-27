import { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import axiosInstance from '../../api/axios';
import { firebaseAuth } from '../../global';

export const Dashboard = () => {
  // const navigate = useNavigate();
  const {user} = useContext(UserContext);


  const sendRequest = () => {
    firebaseAuth.currentUser?.getIdToken(true)
      .then((tk) => {
        axiosInstance({
          method: 'get',
          url: '/loguser',
          headers: {
            'Authorization' : `Bearer ${tk}`
          }
        }).then(() => {
          console.log('SUccessfull');
        }).catch(()=> {
          console.log('failed');
        });
      })
      .catch(() => {
        console.log('Error on getting token');
      });
  };
  useEffect(() => {
    // if(user){
    //   console.log('welcome');
    // }else {
    //   navigate('/auth');
    // }
  },[user]);

  return <div>
    <button onClick={sendRequest}>
		Reuqest
    </button>
  </div>;
};


// useEffect(() => {
// 	const controller = new AbortController();
// 	axiosInstance({
// 		method: 'get',
// 		url: '/',
// 		signal: controller.signal
// 	}).then((res) => {
// 		console.log(res);
// 	}).catch((err) => {
// 		if(!(err.code === 'ERR_CANCELED')){
// 			console.log(err);
// 		}
// 	}); 
// 	return () => {
// 		controller.abort();
// 	};
// }, []);