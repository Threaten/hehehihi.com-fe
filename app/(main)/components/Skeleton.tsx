import React from "react";

export const ImageSkeleton = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse bg-gray-300 rounded-lg ${className}`}
    aria-hidden="true"
  />
);

export const TextSkeleton = ({
  lines = 1,
  className = "",
}: {
  lines?: number;
  className?: string;
}) => (
  <div className={`space-y-2 ${className}`} aria-hidden="true">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-4 bg-gray-300 rounded animate-pulse"
        style={{ width: i === lines - 1 ? "80%" : "100%" }}
      />
    ))}
  </div>
);

export const CardSkeleton = () => (
  <div className="animate-pulse" aria-hidden="true">
    <div className="bg-gray-300 h-64 rounded-lg mb-4" />
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-300 rounded w-1/2" />
  </div>
);

export const GallerySkeleton = () => (
  <div
    className="grid grid-cols-1 md:grid-cols-3 gap-4"
    aria-label="Loading gallery"
  >
    <div className="md:col-span-2">
      <ImageSkeleton className="h-[400px] md:h-[500px]" />
    </div>
    <div className="flex flex-col gap-4">
      <ImageSkeleton className="h-[195px] md:h-[242px]" />
      <ImageSkeleton className="h-[195px] md:h-[242px]" />
    </div>
    <ImageSkeleton className="h-[300px] md:h-[400px]" />
    <div className="md:col-span-2">
      <ImageSkeleton className="h-[300px] md:h-[400px]" />
    </div>
  </div>
);

export const MenuSkeleton = () => (
  <div
    className="w-full h-[600px] flex items-center justify-center"
    aria-label="Loading menu"
  >
    <div className="relative">
      <div
        className="animate-pulse bg-gray-300 rounded-lg shadow-2xl"
        style={{ width: "800px", height: "600px" }}
      />
    </div>
  </div>
);
