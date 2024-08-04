"use client";

import NoproductModal from "@/components/custom ui/NoproductModal";

import { columnsProducts } from "@/components/productsDataTable/components/columnsProducts";
import { DataTableProducts } from "@/components/productsDataTable/components/data-table-products";
import { Button } from "@/components/ui/button";
import useGetCategories from "@/hook/useGetCategories";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductsType[]>([]);
  const { categoriesLenght, loadingg } = useGetCategories();

  const getProdeucts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      // console.log(data);
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
    <div className="px-10 py-4 lg:py-11 -z-40">
      <div className="flex items-center justify-between">
        <p className="font-bold text-5xl mb-3">
          {loading ? "loading..." : "All Product"}
        </p>
        {categoriesLenght == 0 ? (
          <NoproductModal />
        ) : (
          <Link href="/dashboard/products/new">
            <Button className="text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Products
            </Button>
          </Link>
        )}
      </div>

      <Separator className="bg-grey-1 my-4" />
      {loadingg ? (
        <p>Loading</p>
      ) : (
        <DataTableProducts columns={columnsProducts} data={products} />
      )}
    </div>
  );
};

export default Products;
