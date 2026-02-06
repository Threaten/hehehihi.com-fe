"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchTenantBySlug, type Tenant } from "@/api/queries";

const CTA = () => {
  const [tenant, setTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    // Detect if we're on a tenant subdomain and fetch tenant data
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const parts = hostname.split(".");

      // Check if there's a subdomain (e.g., yellow-bistro.localhost)
      if (parts.length > 1 && hostname.includes("localhost")) {
        const subdomain = parts[0];

        if (subdomain && subdomain !== "www") {
          fetchTenantBySlug(subdomain)
            .then((data) => {
              if (data) setTenant(data);
            })
            .catch((err) => {
              console.error("Error fetching tenant:", err);
            });
        }
      }
    }
  }, []);

  const tenantName = tenant ? tenant.name.toLowerCase() : "elementa";

  return (
    <section
      className="px-4 bg-background text-gray-900 mt-12 mb-12"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Main CTA */}
        <div className="text-center">
          <h2 id="cta-heading" className="text-4xl font-bold mb-6">
            Experience {tenantName} Today
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            Join us for an unforgettable culinary journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/reservation"
              className="px-8 py-3 bg-transparent border-2 w-60 h-14 flex items-center justify-center border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-900 focus:ring-offset-2 transition-all duration-300 text-lg tracking-wide font-medium button-ripple"
              aria-label={`Make a reservation at ${tenantName}`}
            >
              RESERVE A TABLE
            </Link>
            <Link
              href="/menu"
              className="px-8 py-3 bg-transparent border-2 w-60 h-14 flex items-center justify-center border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-900 focus:ring-offset-2 transition-all duration-300 text-lg tracking-wide font-medium button-ripple"
              aria-label={`View ${tenantName}'s menu`}
            >
              EXPLORE MENU
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
