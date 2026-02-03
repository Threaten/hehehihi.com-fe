"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CTA from "../components/CTA";
import { fetchTenantBySlug, type Tenant } from "@/api/queries";

export default function AboutPage() {
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <div className="absolute inset-0">
          <Image
            src="/media/Artboard 11@2x.PNG"
            alt="Restaurant interior"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-wide">
            about {tenantName}
          </h1>
          <p className="text-xl md:text-2xl font-light">
            A Journey of Culinary Excellence
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Founded in 2015, {tenantName} was born from a passion for creating
                unforgettable dining experiences. Our name reflects our
                philosophy: returning to the beauty of fresh
                ingredients, expertly prepared with care and creativity.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                We believe that great food brings people together. Every dish we
                serve tells a story, combining traditional techniques with
                innovative approaches to create flavors that surprise and
                delight.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our commitment to sustainability and locally-sourced ingredients
                ensures that every meal not only tastes exceptional but also
                supports our community and environment.
              </p>
            </div>
            <div className="relative h-[500px]">
              <Image
                src="/media/IMG_0050.JPG"
                alt="Chef preparing food"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-900 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Quality First
              </h3>
              <p className="text-gray-700">
                We source only the finest ingredients and never compromise on
                quality, ensuring every dish meets our high standards.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-900 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Community Focus
              </h3>
              <p className="text-gray-700">
                Supporting local farmers and artisans is at the heart of what we
                do, strengthening our community bonds.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-900 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Innovation
              </h3>
              <p className="text-gray-700">
                We constantly evolve our menu and techniques, blending tradition
                with creativity to surprise and delight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative h-80 mb-4">
                <Image
                  src="/media/IMG_0051.JPG"
                  alt="Head Chef"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Chef Michael Chen
              </h3>
              <p className="text-gray-600 mb-2">Executive Chef</p>
              <p className="text-gray-700 text-sm">
                With 15 years of culinary experience, Chef Michael brings
                expertise from Michelin-starred kitchens around the world.
              </p>
            </div>
            <div className="text-center">
              <div className="relative h-80 mb-4">
                <Image
                  src="/media/IMG_0052.JPG"
                  alt="Sommelier"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Sarah Martinez
              </h3>
              <p className="text-gray-600 mb-2">Head Sommelier</p>
              <p className="text-gray-700 text-sm">
                Sarah&apos;s passion for wine pairing enhances every dining
                experience with perfectly curated selections.
              </p>
            </div>
            <div className="text-center">
              <div className="relative h-80 mb-4">
                <Image
                  src="/media/IMG_0053.JPG"
                  alt="Restaurant Manager"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                James Wilson
              </h3>
              <p className="text-gray-600 mb-2">Restaurant Manager</p>
              <p className="text-gray-700 text-sm">
                James ensures every guest feels welcomed and every detail is
                perfect, creating memorable experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-20"></div>

      {/* CTA Section */}
      <CTA />

      {/* Spacer */}
      <div className="h-20"></div>
    </div>
  );
}
