"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../components/data-table-column-header";
import { DataTableRowActions } from "../components/data-table-row-actions";

export const columnsProducts: ColumnDef<ProductsType>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ชื่อสินค้า" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ประเภทสินค้า" />
    ),
    cell: ({ row }) => {
      const category: CategoryType = row.getValue("category");
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {category ? category.title : "ไม่มีประเภทสินค้า"}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ราคาสินค้า" />
    ),
    cell: ({ row }) => {
      const price: number = row.getValue("price");
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium ">{price}</span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "statusPublish",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Publish" />
    ),
    cell: ({ row }) => {
      const statusPublish: boolean = row.getValue("statusPublish");
      return (
        <div className="flex space-x-2">
          <span
            className={`max-w-[100px] truncate font-medium ${
              statusPublish ? "text-green-500" : "text-red-700"
            }`}>
            {statusPublish ? "Yes" : "No"}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "isNewArrival",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="สินค้ามาใหม่" />
    ),
    cell: ({ row }) => {
      const isNewArrival: boolean = row.getValue("isNewArrival");

      return (
        <div className="flex space-x-2">
          {isNewArrival ? (
            <h6 className="text-blue-600">สินค้ามาใหม่</h6>
          ) : (
            <h6>-</h6>
          )}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "isBestSeller",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="สินค้าขายดี" />
    ),
    cell: ({ row }) => {
      const isBestSeller: boolean = row.getValue("isBestSeller");

      return (
        <div className="flex space-x-2">
          {isBestSeller ? (
            <h6 className="text-pink-600">สินค้าขายดี</h6>
          ) : (
            <h6>-</h6>
          )}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
