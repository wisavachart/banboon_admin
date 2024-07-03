import Product from "@/lib/models/Product";
import { connectionToDb } from "@/lib/mongoDb";
import { NextRequest, NextResponse } from "next/server";

// localhost:3000/api/products/bycategory/1 <- CateGory ID
// GET PRODUCT BY Category ID
export const GET = async (
  req: NextRequest,
  { params }: { params: { categoriesId: string } }
) => {
  try {
    await connectionToDb();

    const productBycategory = await Product.find({
      category: params.categoriesId,
    })
      .sort({ createdAt: -1 })
      .exec();

    return NextResponse.json(productBycategory, { status: 200 });
  } catch (err) {
    return new NextResponse("Internam Error", { status: 500 });
  }
};
