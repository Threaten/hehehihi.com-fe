"use client";

import Script from "next/script";
import { useState, useEffect } from "react";
import { fetchTenantBySlug, type Tenant } from "@/api/queries";

export default function StructuredData() {
  const [tenant, setTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    // Detect if we're on a tenant subdomain and fetch tenant data
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const parts = hostname.split(".");

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
  const tenantPhone = tenant?.phone || "+1-234-567-8900";
  const tenantEmail = tenant?.email || "info@elementa-restaurant.com";
  const tenantAddress = tenant?.address || "123 Main Street, Downtown";

  const restaurantData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: tenantName,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description:
      `Experience exceptional fine dining at ${tenantName}. Contemporary cuisine with locally-sourced ingredients in an elegant atmosphere.`,
    servesCuisine: "Contemporary",
    priceRange: "$$$",
    telephone: tenantPhone,
    email: tenantEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Main Street",
      addressLocality: "Downtown",
      addressRegion: "State",
      postalCode: "12345",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.7128,
      longitude: -74.006,
    },
    url: "https://elementa-restaurant.com",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "11:00",
        closes: "22:00",
      },
    ],
    acceptsReservations: "True",
    menu: "https://elementa-restaurant.com/menu",
    hasMenu: {
      "@type": "Menu",
      url: "https://elementa-restaurant.com/menu",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
    sameAs: [
      "https://facebook.com/elementa",
      "https://instagram.com/elementa",
      "https://tiktok.com/@elementa",
    ],
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ELEMENTA Restaurant",
    url: "https://elementa-restaurant.com",
    logo: "https://elementa-restaurant.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-234-567-8900",
      contactType: "reservations",
      email: "reservations@elementa-restaurant.com",
      availableLanguage: ["English"],
    },
    sameAs: [
      "https://facebook.com/elementa",
      "https://instagram.com/elementa",
      "https://tiktok.com/@elementa",
    ],
  };

  return (
    <>
      <Script
        id="restaurant-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurantData),
        }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
    </>
  );
}
