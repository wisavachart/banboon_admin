"use client";

import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import FetchFilterCategoryBtn from "./fetch-filter-btn";
import FilterDisplayBox from "./fetch-filter-display-box";
import useFilterState from "@/lib/global-state-manage";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { isFillterOn } = useFilterState();
  return (
    <div className="flex items-center justify-between ">
      <div className="flex max-w-[500px] items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="ml-3">
        <FetchFilterCategoryBtn />
      </div>
      {isFillterOn && <FilterDisplayBox />}
      <DataTableViewOptions table={table} />
    </div>
  );
}
