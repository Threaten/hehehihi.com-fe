import ContactForm from "./_components/ContactForm";
import CTA from "../components/CTA";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ branch?: string; tenant?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <ContactForm
        initialBranch={params?.branch}
        currentTenant={params?.tenant}
      />
      <CTA />
    </>
  );
}
