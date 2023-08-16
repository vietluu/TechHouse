'use client'; // Error components must be Client Components

import { useEffect, useLayoutEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useLayoutEffect(() => {
    // Log the error to an error reporting service
    reset();
  }, [error]);

  return (
    <div className="bg-slate-900 h-[100vh] text-white flex justify-center items-center flex-col ">
      <h2 className="text-2xl ">Something went wrong!</h2>
      <button
        className="text-sky-500 text-xl border-sky-500 p-3"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
