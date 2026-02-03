"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsTransitioning(true);
    }, 0);

    const endTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, [pathname]);

  return (
    <div
      className={`transition-opacity duration-300 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {children}
    </div>
  );
}
