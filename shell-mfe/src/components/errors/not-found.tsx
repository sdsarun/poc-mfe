import Button from "@/components/button/button";
import { Link } from "@tanstack/react-router";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-4">
      <h1 className="text-6xl md:text-8xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-xl md:text-2xl text-gray-700 text-center max-w-md">
        Oops! The page you're looking for doesn't exist.
      </p>
      <p className="mt-2 text-gray-500 text-center max-w-md">
        It might have been removed, renamed, or never existed.
      </p>
      <Link to="/">
        <Button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Go Home
        </Button>
      </Link>
      <div className="mt-10 text-gray-400 text-sm text-center max-w-md">
        <p>If you think this is a mistake, contact support.</p>
      </div>
    </div>
  );
};

export default React.memo(NotFound);
