"use client";
import React, { useState, useEffect } from "react";
import {
  fetchTenants,
  getCustomerByPhone,
  createCustomer,
  createContactMessage,
  type Tenant,
} from "@/api/queries";

interface FormData {
  name: string;
  phone: string;
  branch: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  branch?: string;
}

interface Toast {
  message: string;
  type: "success" | "error";
}

const ContactForm = ({
  initialBranch,
  currentTenant,
}: {
  initialBranch?: string;
  currentTenant?: string;
}) => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch tenants from API
  useEffect(() => {
    const loadTenants = async () => {
      try {
        const data = await fetchTenants();
        if (data && data.length > 0) {
          setTenants(data);

          // Auto-select branch based on currentTenant (subdomain) or initialBranch
          if (currentTenant) {
            const tenant = data.find((t: Tenant) => t.slug === currentTenant);
            if (tenant) {
              setSelectedBranch(tenant.name);
            }
          } else if (initialBranch) {
            const decodedBranch = decodeURIComponent(
              initialBranch.replace(/\+/g, " "),
            );
            setSelectedBranch(decodedBranch);
          } else {
            setSelectedBranch(data[0].name);
          }
        }
      } catch (error) {
        console.error("Error loading tenants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTenants();
  }, [currentTenant, initialBranch]);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    branch: "",
    message: "",
  });

  // Update form data when selectedBranch changes
  useEffect(() => {
    if (selectedBranch) {
      setFormData((prev) => ({
        ...prev,
        branch: selectedBranch,
      }));
    }
  }, [selectedBranch]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const validateVietnamesePhone = (phone: string): boolean => {
    // Vietnamese phone number patterns:
    // Mobile: 03, 05, 07, 08, 09 + 8 digits
    // Landline: 02 + 9 digits
    const mobileRegex = /^(03|05|07|08|09)[0-9]{8}$/;
    const landlineRegex = /^02[0-9]{9}$/;
    const cleanPhone = phone.replace(/\s+/g, "");
    return mobileRegex.test(cleanPhone) || landlineRegex.test(cleanPhone);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 5) {
      newErrors.name = "Name must be at least 5 characters";
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validateVietnamesePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid Vietnamese phone number";
    }

    // Validate branch
    if (!formData.branch) {
      newErrors.branch = "Please select a branch";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Check if customer exists
      let customer = await getCustomerByPhone(formData.phone);

      // Step 2: Create customer if doesn't exist
      if (!customer) {
        customer = await createCustomer(formData.name, formData.phone);
      }

      // Step 3: Find the selected tenant
      const selectedTenant = tenants.find((t) => t.name === formData.branch);

      if (!selectedTenant) {
        throw new Error("Selected branch not found");
      }

      // Step 4: Create contact message
      await createContactMessage(
        customer.id,
        formData.message,
        selectedTenant.id,
      );

      console.log("Contact message submitted successfully");

      // Show success toast
      setToast({
        message: "Message sent successfully!",
        type: "success",
      });

      // Reset form - preserve branch based on currentTenant or keep current selection
      setFormData({
        name: "",
        phone: "",
        branch: selectedBranch,
        message: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Contact submission error:", error);
      // Show error toast
      setToast({
        message: "Failed to send message. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);

      // Auto-hide toast after 5 seconds
      setTimeout(() => {
        setToast(null);
      }, 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="min-h-screen mt-12 bg-background py-16 px-4">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 px-6 py-4 rounded-lg shadow-lg z-50 transition-all ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          <p className="font-medium">{toast.message}</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-gray-600">Loading...</div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side - Info */}
          <div className="space-y-12">
            {/* Title Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Have a question or feedback? We&apos;d love to hear from you.
                Fill out the form and we&apos;ll get back to you as soon as
                possible.
              </p>
            </div>

            {/* Branch Info */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Our Locations
              </h3>
              <div className="space-y-6">
                {tenants && tenants.length > 0 ? (
                  tenants.map((tenant) => (
                    <div key={tenant.id}>
                      <p className="font-medium text-gray-900 mb-2">
                        {tenant.name.toLowerCase()}
                      </p>
                      {tenant.address && (
                        <p className="text-gray-600">{tenant.address}</p>
                      )}
                      {tenant.phone && (
                        <p className="text-gray-600">{tenant.phone}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">Loading locations...</p>
                )}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Email us
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="font-medium text-gray-900 mb-1">General</p>
                  <a
                    href="mailto:info@elementa.com"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    info@elementa.com
                  </a>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Support</p>
                  <a
                    href="mailto:support@elementa.com"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    support@elementa.com
                  </a>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Follow us
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-900 transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-900 transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-900 transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="border border-gray-200 rounded-2xl p-8 lg:p-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-0 py-3 border-0 border-b-2 focus:ring-0 focus:border-gray-900 outline-none transition-all bg-transparent ${
                    errors.name ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-0 py-3 border-0 border-b-2 focus:ring-0 focus:border-gray-900 outline-none transition-all bg-transparent ${
                    errors.phone ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Phone"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Branch */}
              <div>
                <select
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  disabled={!!currentTenant}
                  className={`w-full px-0 py-3 border-0 border-b-2 focus:ring-0 focus:border-gray-900 outline-none transition-all bg-transparent appearance-none text-gray-900 ${
                    errors.branch ? "border-red-500" : "border-gray-200"
                  } ${currentTenant ? "opacity-60 cursor-not-allowed" : ""}`}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23374151'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                    backgroundPosition: "right center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                  }}
                >
                  {tenants.map((tenant) => (
                    <option key={tenant.id} value={tenant.name}>
                      {tenant.name}
                    </option>
                  ))}
                </select>
                {errors.branch && (
                  <p className="mt-1 text-sm text-red-500">{errors.branch}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-900 outline-none transition-all bg-transparent resize-none"
                  placeholder="Message (Optional)"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full border-black border-2 text-black hover:text-white py-4 rounded-lg font-medium hover:bg-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mt-8 button-ripple focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                aria-label="Send contact message"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
