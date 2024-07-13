"use client";

import { columns } from "@/components/categories/CollectionColumn";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import useGetCategories from "@/hook/useGetCategories";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

//หน้าColections
const Categories = () => {
  const router = useRouter();
  const { categories, loadingg } = useGetCategories();

  return (
    <div className="  px-10 py-4 lg:py-11">
      <div className="flex items-center justify-between">
        <p className="font-bold text-2xl">
          {loadingg ? "loading..." : "Categories"}
        </p>
        <Button
          className="text-white"
          onClick={() => router.push("/categories/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Category
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={categories} searchKey="title" />
    </div>
  );
};

export default Categories;
