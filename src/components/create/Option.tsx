import { FC } from 'react';

type OptionRadioProps = {
  isSelected: boolean,
  optionType: 'radio' | 'checkbox'
}
const Option:FC<OptionRadioProps> = ({
  isSelected,
  optionType,
}) => {
  return <div className={`w-6 h-6 p-1 ${optionType === 'checkbox' ? 'rounded-md' : 'rounded-full'} bg-slate-200 flex items-center justify-center`}>
    <div className={`w-full h-full ${optionType === 'checkbox' ? 'rounded-md' : 'rounded-full'}  ${isSelected ? 'bg-blue-500' : 'bg-transparent'}`}></div>
  </div>;
};

export default Option;

