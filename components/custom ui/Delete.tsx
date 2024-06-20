"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import CategoryService from "@/services/CategoryService";
import ProductService from "@/services/ProductService";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

interface DeleteProps {
  item: string;
  id: string;
}
const Delete = ({ item, id }: DeleteProps) => {
  const [loading, setloading] = useState(false);

  const onDelete = async () => {
    try {
      setloading(true);
      const itemTypeTodelete =
        item === "product"
          ? ProductService.deleteCategory(id)
          : CategoryService.deleteCategory(id);
      const res = await itemTypeTodelete;
      if (res) {
        window.location.href = `/${
          item === "product" ? "products" : "categories"
        }`;
        toast.success("Categories Delete");
      }
    } catch (err) {
      console.log(err);
      toast.error("try agin");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-700 text-white">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-red-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            {item === "product" ? " product" : " category"} and remove your data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-red-700 text-white">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
