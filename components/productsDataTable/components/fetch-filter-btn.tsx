"use client";
import React from "react";
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

const FetchFilterCategoryBtn = () => {
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
        <DropdownMenuItem>เสริมความงามและสุขภาพ</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>ของทำบุญ</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>อุปกรณ์สัตว์เลี้ยง</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>อุปกรณ์ทำความสะอาด</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>ของใช้ส่วนตัวและกิฟต์ชอป</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>อิเล็กทรอนิกส์</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>เครื่องมือช่าง</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>เครื่องเขียนและอุปกรณ์สำนักงาน</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>เครื่องครัว</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>ของใช้ในบ้าน</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span className="text-green-600">All</span>
          <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FetchFilterCategoryBtn;
