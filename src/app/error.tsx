'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="bg-slate-900 h-[100vh] text-white flex justify-center items-center flex-col ">
      <h2 className="text-2xl ">Something went wrong!</h2>
      <button
        className="text-sky-500 text-xl border-sky-500 p-3"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => window.location.reload()
        }
      >
        Try again
      </button>
    </div>
  );
}
