"use client";
import { CircleX, CrossIcon, Filter } from "lucide-react";
import React from "react";

const FilterDisplayBox = () => {
  return (
    <div className="flex h-8 w-fit px-4 border ml-3 items-center justify-center gap-3 rounded-sm">
      <p className="text-[14px] text-gray-500">ของเล่นเด็ก</p>
      <CircleX
        size="16px"
        color="red"
        onClick={() => console.log("Cancle Filter")}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default FilterDisplayBox;
