import React, { FC } from 'react';

type OwnProps = {
    onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, 
    value: string,
}
export const AuthButton:FC<OwnProps> = ({
  onClick,
  value
}) => {
  return (
    <button className="self-start border-slate-300 border-2 rounded-md px-5 py-2 w-[7rem] bg-slate-300 text-slate-900 font-medium"
      onClick={onClick}>
      {value}
    </button>
  );
};