import CollectionForm from "@/components/categories/CollectionForm";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

const CrateNewCategories = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) redirect("/login");
  return <CollectionForm />;
};

export default CrateNewCategories;
