import React from "react";

function PageNotFound() {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We can't find that page.</p>

        <a
          href="/"
          className="mt-6 inline-block rounded bg-[#0074d9] px-4 py-2 text-xl font-medium text-white hover:bg-[#0074d9] focus:outline-none focus:ring"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}

export default PageNotFound;
