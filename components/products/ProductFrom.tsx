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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetCategories from "@/hook/useGetCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import ImageCoverUpload from "../custom ui/ImageCoverUpload";
import ImageUpload from "../custom ui/ImageUpload";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must contain at least 2 character(s)" })
    .max(50),
  description: z
    .string()
    .min(2, { message: "Description must contain at least 2 character(s)" })
    .max(500)
    .trim(),
  category: z.string().min(1, { message: "Category is required" }).trim(),

  price: z.coerce.number().min(0.1),
  imageCover: z.string(),
  statusPublish: z.boolean({ required_error: "Status is required" }),
  isNewArrival: z.boolean({ required_error: "Status is required" }),
  isBestSeller: z.boolean({ required_error: "Status is required" }),
});

interface ProductFormProps {
  initData?: ProductsType | null; //? means it can be optional
}

const ProductFrom = ({ initData }: ProductFormProps) => {
  const { categories } = useGetCategories();
  const [imgProduct, setImgproduct] = useState<string[]>([]);
  useEffect(() => {
    if (initData?.media) {
      setImgproduct(initData.media);
    }
  }, []);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initData
      ? {
          ...initData,
          category: initData.category ? initData.category._id : "",
        }
      : {
          title: "",
          description: "",
          category: "",
          price: 20,
          imageCover: "",
          statusPublish: true,
          isNewArrival: false,
          isBestSeller: false,
        },
  });
  const [isNewArrival, setIsNewArrival] = useState(
    String(form.getValues("isNewArrival"))
  );
  const [isBestSeller, setIsBestSeller] = useState(
    String(form.getValues("isBestSeller"))
  );

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  ///SUBMIT
  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    const productData = { ...value, media: imgProduct };

    if (initData) {
      try {
        const res = await fetch(`/api/products/${initData._id}`, {
          method: "POST",
          body: JSON.stringify(productData),
        });
        if (res.ok) {
          const data = await res.json();
          // console.log(data);
          window.location.href = "/products";
          toast.success("Update product Suceess");
        }
      } catch (err) {
        console.error(err, "ERROR");
        toast.error("error");
      }
      return;
    }

    //BELOW HERE IS OK
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(productData),
      });
      if (res.ok) {
        window.location.href = "/products";
        toast.success("Create product Suceess");
      }
    } catch (err) {
      console.error(err, "ERROR");
      toast.error("error");
    }
  };

  return (
    <div className="px-10 py-4 lg:py-12">
      <p className="font-bold text-2xl">
        {initData ? "Update Products" : "Create Products"}
      </p>

      <Separator className="my-4 bg-grey-1" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
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
                <FormLabel>description</FormLabel>
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
            name="imageCover"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <h1>ภาพหน้าปกสินค้า</h1>
                </FormLabel>
                <FormControl>
                  <ImageCoverUpload
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
          <div>
            <h1>อัพโหลดอัลบั้มภาพสินค้า</h1>
            <ImageUpload
              value={imgProduct}
              onChange={(imgurl) => setImgproduct((prev) => [...prev, imgurl])}
              onRemove={(imgurl) =>
                setImgproduct((prev) => prev.filter((img) => img !== imgurl))
              }
            />
          </div>

          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* /// Category Select */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {categories.map((cate: CategoryType) => (
                        <SelectItem key={cate._id} value={cate._id}>
                          {cate.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* /// Status Select */}
            <FormField
              control={form.control}
              name="statusPublish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Status</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(val === "true")}
                    defaultValue={String(field.value)}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="true">publish</SelectItem>
                      <SelectItem className="bg-red-50" value="false">
                        unpublish
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* /// Status NewArrival Select */}
            {isBestSeller === "false" && (
              <FormField
                control={form.control}
                name="isNewArrival"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>สินค้าใหม่ ?</FormLabel>
                    <Select
                      onValueChange={(val) => {
                        field.onChange(val === "true");
                        setIsNewArrival(val);
                      }}
                      defaultValue={String(field.value)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        <SelectItem value="true">enable</SelectItem>
                        <SelectItem className="bg-red-50" value="false">
                          disable
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {/* /// Status Besseller Select */}
            {isNewArrival === "false" && (
              <FormField
                control={form.control}
                name="isBestSeller"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>สินค้าขายดี ?</FormLabel>
                    <Select
                      onValueChange={(val) => {
                        field.onChange(val === "true");
                        setIsBestSeller(val);
                      }}
                      defaultValue={String(field.value)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        <SelectItem value="true">enable</SelectItem>
                        <SelectItem className="bg-red-50" value="false">
                          disable
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <div className="flex gap-5">
            <Button type="submit" className=" text-white">
              Submit
            </Button>
            <Button
              className=" text-white"
              type="button"
              onClick={() => router.push("/products")}>
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductFrom;
