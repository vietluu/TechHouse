import React from 'react';

function SkeletonCart() {
  return (
    <div role="status" className="w-full  space-y-2   animate-pulse">
      <div className="flex items-center justify-between border shadow border-gray-300 px-4 py-6 space-y-2 rounded-sm bg-white">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
      </div>
      <div className="flex items-center justify-between  border shadow border-gray-300 px-4 py-6 space-y-2 rounded-sm bg-white">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
      </div>
      <div className="flex items-center justify-between   border shadow border-gray-300 px-4 py-6 space-y-2 rounded-sm bg-white">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
      </div>
      <div className="flex items-center justify-between   border shadow border-gray-300 px-4 py-6 space-y-2 rounded-sm bg-white">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
      </div>
      <div className="flex items-center justify-between   border shadow border-gray-300 px-4 py-6 space-y-2 rounded-sm bg-white">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default SkeletonCart;
