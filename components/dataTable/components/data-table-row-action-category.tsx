"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row, RowExpanding } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import ProductService from "@/services/ProductService";
import CategoryService from "@/services/CategoryService";

interface WithType {
  _id: string;
  title: string;
}
interface DataTableRowActionsProps<TData extends WithType> {
  row: Row<TData>;
}
export function DataTableRowActionsCategory<TData extends WithType>({
  row,
}: DataTableRowActionsProps<TData>) {
  const onDelete = async (title: string, id: string) => {
    if (confirm(`คุณต้องการจะลบสินค้า ${title} ใช่หรือไม่ ?`)) {
      try {
        const itemTypeTodelete = CategoryService.deleteCategory(id);
        const res = await itemTypeTodelete;
        if (res) {
          window.location.href = "/dashboard/categories";
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <Link href={`/dashboard/categories/${row.original._id}`}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onDelete(row.original.title, row.original._id)}>
          <span className="text-red-700">Delete</span>
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
