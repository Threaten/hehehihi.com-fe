import ContactForm from "./_components/ContactForm";
import CTA from "../components/CTA";

export default function ContactPage({
  searchParams,
}: {
  searchParams: { branch?: string; tenant?: string };
}) {
  return (
    <>
      <ContactForm
        initialBranch={searchParams?.branch}
        currentTenant={searchParams?.tenant}
      />
      <CTA />
    </>
  );
}
