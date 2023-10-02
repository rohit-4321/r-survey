import '../../App.css';
type SnackbarVarient = 'error' | 'success' | 'warning';
const Duration = {
  veryShort: 500,
  short: 1000,
  medium: 1500,
  long: 2000,
  veryLong: 2500
} as const;
type SnackbarDuration = keyof typeof Duration;
interface SnackbarParams {
  message: string,
  varient?: SnackbarVarient,
  duration?: SnackbarDuration
} 
const snackbarWrapper = document.createElement('div');
snackbarWrapper.className = 'snackbar-wrapper';
document.body.appendChild(snackbarWrapper);
export const createSnackbar = ({
  message,
  duration = 'medium',
  varient = 'success'
}: SnackbarParams ) => {
  const snackBar = document.createElement('div');
  let className = '';
  if(varient === 'success') {
    className = 'snack-bar-success';
  }else if(varient === 'error'){
    className = 'snack-bar-error';
  }else {
    className = 'snack-bar-warning';
  }
  snackBar.className = className;
  snackBar.textContent = message;
  snackbarWrapper.appendChild(snackBar);
  snackbarWrapper.scrollTop = snackbarWrapper.scrollHeight ;
  setTimeout(() => {
    snackbarWrapper.removeChild(snackBar);
  }, Duration[duration]);

};