import React, { FC } from 'react';

type OwnProps = {
    onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, 
    value: string,
    isLoading: boolean
}
export const AuthButton:FC<OwnProps> = ({
  onClick,
  value,
  isLoading,
}) => {
  return (
    <button className="self-start border-slate-300 border-2 rounded-md px-5 py-2 w-[7rem] bg-slate-300 text-slate-900 font-medium"
      onClick={onClick}>
      {
        isLoading ? 'Loading...': value
      }
    </button>
  );
};