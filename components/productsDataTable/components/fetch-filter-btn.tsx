"use client";
import React, { useEffect } from "react";
import { DotsHorizontalIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useGetCategories from "@/hook/useGetCategories";

const FetchFilterCategoryBtn = () => {
  const { categories } = useGetCategories();
  const setCateGory = (id: string) => {
    alert(id);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-20 p-0 data-[state=open]:bg-muted border">
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {categories
          ?.sort((a: CategoryType, b: CategoryType) =>
            a.title.localeCompare(b.title)
          )
          .map((cate: CategoryType, index) => (
            <div key={index} onClick={() => setCateGory(cate._id)}>
              <DropdownMenuItem>{cate.title}</DropdownMenuItem>
              <DropdownMenuSeparator />
            </div>
          ))}

        <DropdownMenuItem>
          <span className="text-green-600">All</span>
          <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FetchFilterCategoryBtn;
