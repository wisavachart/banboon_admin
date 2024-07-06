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
    cell: ({ row }) =>
      row.original.isNewArrival ? (
        <p className="bg-red-600 text-white text-center">สินค้ามาใหม่</p>
      ) : (
        <p className="text-center">-</p>
      ),
  },
  {
    accessorKey: "isBestSeller",
    header: "StatusBestSeller",
    cell: ({ row }) => <p>{row.original.isBestSeller ? "สินค้าขายดี" : "-"}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="product" id={row.original._id} />,
  },
];
