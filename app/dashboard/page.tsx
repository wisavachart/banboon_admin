// "use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useGetCategories from "@/hook/useGetCategories";
import useGetProducts from "@/hook/useGetProducts";
import { getSession } from "@/lib/getSession";

import { Shapes, Tag } from "lucide-react";
import { redirect } from "next/navigation";
export const Home = async () => {
  // const { categoriesLenght } = useGetCategories();
  // const { proDuctLenght } = useGetProducts();
  // console.log(categoriesLenght);
  const session = await getSession();
  const user = session?.user;
  if (!user) redirect("/login");
  return (
    <div className="px-8 py-12">
      <p className="font-bold text-2xl">Dashboard</p>
      <Separator className="bg-slate-500 my-5" />

      <div className="grid grid-cols-2 md:grid-cols-2 gap-10">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Category</CardTitle>
            <Shapes className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            {/* <p className="font-bold text-5xl">{categoriesLenght}</p> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Products</CardTitle>
            <Tag className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            {/* <p className="font-bold text-5xl">{proDuctLenght}</p> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
