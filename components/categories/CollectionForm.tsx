"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CategoryService from "@/services/CategoryService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Delete from "../custom ui/Delete";
import ImageUpload from "../custom ui/ImageUpload";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string(),
  image: z.string(),
});

interface CollectionFormProps {
  initData?: CategoryType | null;
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initData }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initData
      ? initData
      : {
          title: "",
          description: "",
          image: "",
        },
  });
  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    // console.log(value);
    // if (value.image == null) {
    //   console.log("Null");
    //   return;
    // }
    try {
      const service = initData
        ? CategoryService.upDateCategory(value, initData._id)
        : CategoryService.createCategory(value);
      const res = await service;
      if (res) {
        toast.success(`Catagory ${initData ? "updated" : "Created"}`);
        window.location.href = "/categories";
        router.push("/categories");
      }
    } catch (err) {
      toast.error("Something went");
      console.log("[Collection POST]", err);
    }
  };

  return (
    <div className="px-10 py-12">
      {initData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Category</p>
          <Delete item="categories" id={initData._id} />
        </div>
      ) : (
        <p className="font-bold text-2xl">Create Category</p>
      )}

      <Separator className="my-4 bg-slate-400" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อหมวดหมู่สินค้า</FormLabel>
                <FormControl>
                  <Input
                    placeholder="หมวดหมู่สินค้า..."
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  คำอธิบายหมวดหมู่สินค้า
                  <span className="text-red-600">**ไม่จำเป็นต้องกรอก</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Title"
                    {...field}
                    rows={5}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Image <span className="text-red-600">**ไม่จำเป็นต้องอัพ</span>
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => {
                      field.onChange(url);
                    }}
                    onRemove={() => {
                      field.onChange("");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-5">
            <Button type="submit" className=" text-white">
              Submit
            </Button>
            <Button
              className=" text-white"
              type="button"
              onClick={() => router.push("/categories")}>
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CollectionForm;
