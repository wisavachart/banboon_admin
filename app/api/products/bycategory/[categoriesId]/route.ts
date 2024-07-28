import Category from "@/lib/models/Category";
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
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const perPage = 32;

    const baseQuery: { [key: string]: any } = { category: params.categoriesId };
    const totalCount = await Product.countDocuments(baseQuery);
    // Initialize the search query
    const searchQuery = { ...baseQuery };
    // If search term is provided, extend the query
    if (search) {
      const searchWords = search
        .split(" ")
        .map((word) => word.trim())
        .filter((word) => word);
      const regexPattern = searchWords.map((word) => `(?=.*${word})`).join("");
      searchQuery["title"] = { $regex: regexPattern, $options: "i" };
    }
    // Fetch the paginated results based on the search query
    const productBycategory = await Product.find(searchQuery)
      .populate({
        path: "category",
        model: Category,
      })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    // If search term is provided, re-count the total documents matching the search query
    const searchCount = search
      ? await Product.countDocuments(searchQuery)
      : totalCount;
    const totalPages = Math.ceil(searchCount / perPage);

    return NextResponse.json(
      { productBycategory, page, totalPages, totalCount: searchCount },
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse("Internam Error", { status: 500 });
  }
};

// export const GET = async (
//   req: NextRequest,
//   { params }: { params: { categoriesId: string } }
// ) => {
//   try {
//     await connectionToDb();
//     const url = new URL(req.url);
//     const search = url.searchParams.get("search");
//     const productBycategory = await Product.find({
//       category: params.categoriesId,
//     })
//       .sort({ createdAt: -1 })
//       .exec();

//     let productBycateogoryResponse = productBycategory;
//     //For Search
//     if (search) {
//       productBycateogoryResponse = productBycateogoryResponse.filter(
//         (product) => {
//           const searchableText = `${product.title}`;
//           return searchableText.toLowerCase().includes(search.toLowerCase());
//         }
//       );
//     }

//     return NextResponse.json(productBycateogoryResponse, { status: 200 });
//   } catch (err) {
//     return new NextResponse("Internam Error", { status: 500 });
//   }
// };
