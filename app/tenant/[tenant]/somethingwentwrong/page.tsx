"use client";

import { useParams } from "next/navigation";

export default function TenantErrorPage() {
  const params = useParams();
  const tenantSlug = Array.isArray(params?.tenant)
    ? params.tenant[0]
    : params?.tenant;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-400 text-lg mb-8 text-center max-w-md">
        We encountered an unexpected error. Please try again later.
      </p>
      <button
        onClick={() => (window.location.href = "/")}
        className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-700"
      >
        Back to Home
      </button>
    </div>
  );
}
