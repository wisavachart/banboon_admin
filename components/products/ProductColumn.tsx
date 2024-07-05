"use client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Delete from "../custom ui/Delete";

export const columns: ColumnDef<ProductsType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link href={`/products/${row.original._id}`} className="hover:text-red-1">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row.original.category.title,
  },
  {
    accessorKey: "price",
    header: "Price (฿)",
  },
  {
    accessorKey: "statusPublish",
    header: "Status",
    cell: ({ row }) => (
      <p>{row.original.statusPublish ? "Plublish" : "Unplublish"}</p>
    ),
  },
  {
    accessorKey: "isNewArrival",
    header: "StatusNewProduct",
    cell: ({ row }) => (
      <p>{row.original.isNewArrival ? "สินค้ามาใหม่" : "-"}</p>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="product" id={row.original._id} />,
  },
];
