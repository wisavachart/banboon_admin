"use client";
import useGetCategories from "@/hook/useGetCategories";
import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Separator } from "../ui/separator";
import { DataTable } from "../custom ui/DataTable";

import { columns } from "../categories/CollectionColumn";
import Link from "next/link";

const CategoryMainpage = () => {
  const { categories, loadingg } = useGetCategories();
  return (
    <div className="  px-10 py-4 lg:py-11">
      <div className="flex items-center justify-between">
        <p className="font-bold text-2xl">
          {loadingg ? "loading..." : "Categories"}
        </p>
        <Link href="/dashboard/categories/new">
          <Button className="text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Category
          </Button>
        </Link>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={categories} searchKey="title" />
    </div>
  );
};

export default CategoryMainpage;
