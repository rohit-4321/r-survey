import { useState } from 'react';
import { LoadingSVG } from '../../assets/LoadingSVG';

export const Join = () => {
  const [isLoading, setIsLoading] = useState(false);
  return <div className="flex justify-center h-full items-center">
    <div className="flex flex-col items-center space-y-3 p-8 border rounded  bg-slate-800 border-slate-700">
      <div className="flex flex-col gap-1">
        <input className="outline-none px-4 py-2 bg-slate-700 rounded text-slate-50 focus:border-slate-500 focus:ring-1 focus:ring-slate-200 focus:ring-opacity-50" placeholder="Enter Test Code" />
        {/* <span className="text-red-500 text-sm">Invalid Code</span> */}
      </div>
      <button className="bg-slate-300 text-slate-900 font-medium px-4 py-2 rounded hover:bg-slate-400 transition ease-in-out duration-200">
        {
          isLoading ? <LoadingSVG className='fill-slate-600 w-10 h-10' /> : 'Enter'
        }
      </button>
    </div>
  </div>;
};