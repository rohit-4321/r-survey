import { createSnackbar } from '../../global';

export const Home = () => {
  return <div>
    <button onClick={() => {
      createSnackbar({
        message: 'Hello  sWorld',
        duration: 'veryLong',
        varient: 'error'
      });
    }}>Show Snackbar</button>
    <button onClick={() => {
      createSnackbar({
        message: 'Hello  asdasdasdsWorld',
        duration: 'veryLong',
        varient: 'success'
      });
    }}>Show Snackbar</button>
    <div>Home Page</div>
  </div>;
};