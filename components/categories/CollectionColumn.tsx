"use client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Delete from "../custom ui/Delete";

export const columns: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/categories/${row.original._id}`}
        className="hover:text-red-1">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="category" id={row.original._id} />,
  },
];
