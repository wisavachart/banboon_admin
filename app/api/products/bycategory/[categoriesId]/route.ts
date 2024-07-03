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
    const url = new URL(req.url);
    const search = url.searchParams.get("search");
    const productBycategory = await Product.find({
      category: params.categoriesId,
    })
      .sort({ createdAt: -1 })
      .exec();

    let productBycateogoryResponse = productBycategory;
    //For Search
    if (search) {
      productBycateogoryResponse = productBycateogoryResponse.filter(
        (product) => {
          const searchableText = `${product.title}`;
          return searchableText.toLowerCase().includes(search.toLowerCase());
        }
      );
    }

    return NextResponse.json(productBycateogoryResponse, { status: 200 });
  } catch (err) {
    return new NextResponse("Internam Error", { status: 500 });
  }
};
