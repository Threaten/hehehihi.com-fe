"use client";

import ReservationForm from "./_components/ReservationForm";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Reservation = () => {
  const searchParams = useSearchParams();
  const [tenant, setTenant] = useState<string | undefined>(undefined);

  const branch = searchParams.get("branch") || undefined;

  useEffect(() => {
    // Extract tenant from hostname (subdomain)
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const parts = hostname.split(".");

      // If there's a subdomain (e.g., green-bistro.localhost)
      if (parts.length > 1 && parts[0] !== "www") {
        setTenant(parts[0]);
        console.log("Detected tenant from hostname:", parts[0]);
      }
    }
  }, []);

  console.log("Reservation page - tenant:", tenant);

  return <ReservationForm initialBranch={branch} currentTenant={tenant} />;
};

export default Reservation;
