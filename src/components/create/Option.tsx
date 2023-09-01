import { FC } from 'react';

type OptionRadioProps = {
  isSelected: boolean,
}
export const Option:FC<OptionRadioProps> = ({
  isSelected
}) => {
  return <div className="w-6 h-6 p-1 rounded-full bg-slate-200 flex items-center justify-center">
    <div className={`w-full h-full rounded-full ${isSelected ? 'bg-blue-500' : 'bg-transparent'}`}></div>
  </div>;
};

