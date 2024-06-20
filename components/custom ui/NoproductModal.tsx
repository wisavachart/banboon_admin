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
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const NoproductModal = () => {
  const router = useRouter();
  function onAccept() {
    router.push("/categories/new");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Products
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-red-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">
            Can not create product. !!
          </AlertDialogTitle>
          <AlertDialogDescription>
            You don't have any category to create product. Please create
            category first.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onAccept} className=" text-white">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NoproductModal;
