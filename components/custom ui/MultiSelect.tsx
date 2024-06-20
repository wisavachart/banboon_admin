"use client";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";

interface MultiSelectProps {
  placeHolder: string;
  categories: CategoryType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect = ({
  placeHolder,
  categories,
  value,
  onChange,
  onRemove,
}: MultiSelectProps) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  console.log(inputValue);

  return (
    <Command>
      <div className="flex gap-1 flex-wrap border rounded-md">
        <CommandInput
          placeholder={placeHolder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>
      <div className="relative mt-2">
        {open && (
          <CommandList>
            <CommandGroup heading="All Category">
              {categories.map((cate) => (
                <CommandItem
                  onSelect={() => {
                    onChange(cate._id);
                    setInputValue(cate.title);
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                  key={cate._id}>
                  {cate.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
