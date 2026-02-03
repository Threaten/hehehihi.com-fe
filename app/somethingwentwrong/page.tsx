"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function MaintenancePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [randomValues, setRandomValues] = useState<{
    brightness: number[];
    animationDelay: string[];
    animationDuration: string[];
  }>({
    brightness: [],
    animationDelay: [],
    animationDuration: [],
  });

  // Text to display: "Something's broken"
  const text = "Something's broken";

  // Randomly mark some letters as broken (greyed out)
  const brokenIndices = [5, 8, 12, 15]; // indices of letters to grey out
  const buzzIndices = [4, 6, 7, 9, 11, 13, 14, 16]; // adjacent letters to buzz

  useEffect(() => {
    setMounted(true);
    // Generate random values once on client mount
    setRandomValues({
      brightness: text.split("").map(() => 0.2 + Math.random() * 0.8),
      animationDelay: text.split("").map(() => `${Math.random() * -15}s`),
      animationDuration: text.split("").map(() => `${5 + Math.random() * 10}s`),
    });
  }, [text]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      {/* Main glitched text */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
        {text.split("").map((char, index) => {
          const isBroken = brokenIndices.includes(index);
          const isBuzzing = buzzIndices.includes(index);

          // Use pre-generated random values or defaults if not mounted yet
          const brightness = mounted && isBuzzing ? randomValues.brightness[index] : 1;
          const animationDelay = mounted && isBuzzing ? randomValues.animationDelay[index] : "0s";
          const animationDuration = mounted && isBuzzing ? randomValues.animationDuration[index] : "initial";

          return (
            <span
              key={index}
              className={`inline-block ${
                isBroken ? "text-gray-700" : "text-white"
              } ${isBuzzing ? "animate-buzz" : ""}`}
              style={{
                animationDuration,
                animationTimingFunction: "ease-in-out",
                animationDelay,
                opacity: brightness,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 text-sm mb-2 text-center">
        The system is temporarily unavailable.
      </p>
      <p className="text-gray-500 text-xs mb-8 text-center">
        Our team has been notified and is looking into the issue.
      </p>

      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        className="px-6 py-2 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-700"
      >
        Back to Home
      </button>

      {/* Additional glitch overlay effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent animate-glitch-line"></div>
      </div>
    </div>
  );
}
