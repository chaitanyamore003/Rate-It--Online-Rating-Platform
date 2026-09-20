import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 py-12">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute select-none text-[10rem] font-bold leading-none tracking-tighter text-neutral-100 sm:text-[16rem] lg:text-[22rem]"
      >
        404
      </span>

      <div className="relative w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white">
          <ArrowRight
            size={18}
            className="text-neutral-900"
            strokeWidth={1.75}
          />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Page not found
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-neutral-500">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            <span>Go home</span>

            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
