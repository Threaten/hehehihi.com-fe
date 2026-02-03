import Flipbook from "./_components/Flipbook";
import CTA from "../components/CTA";

const Menu = async ({
  searchParams,
}: {
  searchParams: Promise<{ branch?: string }>;
}) => {
  const params = await searchParams;

  return (
    <div>
      <Flipbook initialBranch={params.branch} />
      <CTA />
    </div>
  );
};

export default Menu;
