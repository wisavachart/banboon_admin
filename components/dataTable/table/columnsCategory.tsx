"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../components/data-table-column-header";
import { DataTableRowActions } from "../components/data-table-row-actions";
import Link from "next/link";
import { DataTableRowActionsCategory } from "../components/data-table-row-action-category";

export const columnsCatagory: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "title",
    header: "ชื่อหมวดหมู่",
    cell: ({ row }) => {
      return (
        // <Link
        //   href={`/dashboard/categories/${row.original._id}`}
        //   className="hover:text-red-1">

        // </Link>
        <p>{row.original.title}</p>
      );
    },
  },
  {
    accessorKey: "products",
    header: "จำนวนสินค้าในหมวดหมู่",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActionsCategory row={row} />,
  },
];
