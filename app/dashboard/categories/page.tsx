// "use client";
import { columns } from "@/components/categories/CollectionColumn";
import { DataTable } from "@/components/custom ui/DataTable";
import CategoryMainpage from "@/components/page/CategoryMainpage";
import { Button } from "@/components/ui/button";
import useGetCategories from "@/hook/useGetCategories";
import { getSession } from "@/lib/getSession";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import { redirect, useRouter } from "next/navigation";

//หน้าColections
const Categories = async () => {
  // const router = useRouter();
  // const { categories, loadingg } = useGetCategories();
  const session = await getSession();
  const user = session?.user;
  if (!user) redirect("/login");
  return <CategoryMainpage />;
};
export default Categories;
