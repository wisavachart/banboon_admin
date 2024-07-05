"use client";
import { DataTable } from "@/components/custom ui/DataTable";
import NoproductModal from "@/components/custom ui/NoproductModal";
import { columns } from "@/components/products/ProductColumn";
import { Button } from "@/components/ui/button";
import useGetCategories from "@/hook/useGetCategories";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Products = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductsType[]>([]);
  const { categoriesLenght } = useGetCategories();

  console.log(categoriesLenght);

  function OncreateProduct() {
    router.push("/products/new");
  }
  const getProdeucts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      console.log(data);
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.log("[products_GET]", err);
    }
  };
  useEffect(() => {
    getProdeucts();
  }, []);

  return (
    <div className="px-10 py-4 lg:py-11">
      <div className="flex items-center justify-between">
        <p className="font-bold text-2xl">
          {loading ? "loading..." : "All products"}
        </p>
        {categoriesLenght == 0 ? (
          <NoproductModal />
        ) : (
          <Button className="text-white" onClick={OncreateProduct}>
            <Plus className="h-4 w-4 mr-2" />
            Create Products
          </Button>
        )}
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={products} searchKey="title" />
    </div>
  );
};

export default Products;
