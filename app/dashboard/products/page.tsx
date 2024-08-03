"use client";
import { DataTable } from "@/components/custom ui/DataTable";
import NoproductModal from "@/components/custom ui/NoproductModal";
import { columns } from "@/components/products/ProductColumn";
import { columnsProducts } from "@/components/productsDataTable/components/columnsProducts";
import { DataTableProducts } from "@/components/productsDataTable/components/data-table-products";
import { Button } from "@/components/ui/button";
import useGetCategories from "@/hook/useGetCategories";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import GetDataToExcel from "@/lib/xlxs";
import { get } from "http";

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

  const onExClick = async () => {
    await GetDataToExcel.getAllproduct();
  };

  return (
    <div className="px-10 py-4 lg:py-11 -z-40">
      <div className="flex items-center justify-between">
        <button
          className="bg-green-600 px-3 py-2 rounded-md text-white"
          onClick={onExClick}>
          Export To Excel
        </button>
        <p className="font-bold text-2xl">
          {loading ? "loading..." : "All products"}
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
        // WORK TABLE !!
        // <DataTable columns={columns} data={products} searchKey="title"/>
        <DataTableProducts columns={columnsProducts} data={products} />
        // NEWS TABLE !!
      )}
    </div>
  );
};

export default Products;
