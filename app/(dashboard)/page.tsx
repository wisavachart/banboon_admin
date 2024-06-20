import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { CircleDollarSign, ShoppingBag } from "lucide-react";
export default function Home() {
  return (
    <div className="px-8 py-10">
      <p className="text-heading2-bold">Dashboard</p>
      <Separator className="bg-slate-500 my-5" />

      <div className="grid grid-cols-2 md:grid-cols-2 gap-10">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Category</CardTitle>
            <CircleDollarSign className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="font-bold text-5xl"></p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Products</CardTitle>
            <ShoppingBag className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="font-bold text-5xl"></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
