import React from "react";
import Link from "next/link";
import { Tenant, API_URL } from "@/api/queries";

interface HeroProps {
  tenant?: Tenant | null;
}

const Hero: React.FC<HeroProps> = ({ tenant }) => {
  const title = tenant?.heroTitle || "ELEMENTA";
  const subtitle = tenant?.heroSubtitle || "Exceptional Dining Experience";
  const description =
    tenant?.heroDescription ||
    "Discover the perfect blend of contemporary cuisine and elegant atmosphere, in the heart of the city.";

  // Construct hero image URL from backend if tenant has one
  const heroImageUrl = tenant?.heroImage?.url
    ? `${API_URL}${tenant.heroImage.url}`
    : null;

  return (
    <section
      className="w-full flex items-center justify-center bg-gray-900 text-white relative overflow-hidden"
      style={{ height: "calc(100vh - 116px)" }} // Accounting for topbar (36px) + navbar (80px)
    >
      {/* Background Image - only render if heroImageUrl exists */}
      {heroImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-[zoom_30s_ease-in-out_infinite]"
          style={{
            backgroundImage: `url('${heroImageUrl}')`,
          }}
        ></div>
      )}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/60 z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-wide animate-fade-in">
          {title}
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl mb-8 font-light tracking-wide text-gray-200 animate-fade-in delay-200">
          {subtitle}
        </p>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-gray-300 animate-fade-in delay-300">
          {description}
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-400">
          <Link
            href="/menu"
            className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 hover:shadow-lg hover:scale-105 transition-all duration-300 text-lg tracking-wide font-medium button-ripple"
          >
            EXPLORE MENU
          </Link>
          <Link
            href="/reservation"
            className="px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 text-lg tracking-wide font-medium button-ripple"
          >
            MAKE RESERVATION
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-fade-in delay-500">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
