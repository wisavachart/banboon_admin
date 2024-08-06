"use client";
import useFilterState from "@/lib/global-state-manage";
import { CircleX } from "lucide-react";
import React from "react";

const FilterDisplayBox = () => {
  const { setFilterOff, categoryName } = useFilterState();
  return (
    <div className="flex h-8 w-fit px-4 border ml-3 items-center justify-center gap-3 rounded-sm">
      <p className="text-[14px] text-gray-500">{categoryName}</p>
      <CircleX
        size="16px"
        color="red"
        onClick={setFilterOff}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default FilterDisplayBox;
