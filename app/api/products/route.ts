import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";
import { connectionToDb } from "@/lib/mongoDb";
import { NextRequest, NextResponse } from "next/server";

// Crate New Product
export const POST = async (req: NextRequest) => {
  try {
    await connectionToDb();
    const {
      title,
      description,
      imageCover,
      media,
      category,
      price,
      statusPublish,
      isNewArrival,
      isBestSeller,
    } = await req.json();

    if (!title || !description || !category || !price) {
      return new NextResponse("Not enought data to create a product", {
        status: 500,
      });
    }

    const newProduct = await Product.create({
      title,
      description,
      imageCover,
      media,
      category,
      price,
      statusPublish,
      isNewArrival,
      isBestSeller,
    });
    await newProduct.save();

    const categoryDB = await Category.findById(category);
    if (categoryDB) {
      categoryDB.products.push(newProduct._id);
      await categoryDB.save();
    }

    return NextResponse.json(newProduct, { status: 200 });
  } catch (err) {
    console.log("[products_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// GET ALL Product
// export const GET = async (req: NextRequest) => {
//   try {
//     await connectionToDb();
//     const product = await Product.find()
//       .sort({ createdAt: "desc" })
//       .populate({ path: "category", model: Category });

//     return NextResponse.json(product, { status: 200 });
//   } catch (err) {
//     console.log("[products_GET]", err);
//     return NextResponse.json({ message: err }, { status: 500 });
//   }
// };

// GET ALL Product with max and new avialble
//API = localhost:3001/api/products/
export const GET = async (req: NextRequest) => {
  try {
    await connectionToDb();

    const url = new URL(req.url);
    const cateFilter = url.searchParams.get("category");
    const newproduct = url.searchParams.get("new");
    const search = url.searchParams.get("search");
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const perPage = 32;

    if (newproduct === "newarrival") {
      const baseQuery: { [key: string]: any } = { isNewArrival: true };
      const totalCount = await Product.countDocuments(baseQuery);
      const searchQuery = { ...baseQuery };
      if (search) {
        const searchWords = search
          .split(" ")
          .map((word) => word.trim())
          .filter((word) => word);
        const regexPattern = searchWords
          .map((word) => `(?=.*${word})`)
          .join("");
        searchQuery["title"] = { $regex: regexPattern, $options: "i" };
      }

      const newarrilvalproduct = await Product.find(searchQuery)
        .sort({ createdAt: -1 })
        .populate({ path: "category", model: Category })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
      const searchCount = search
        ? await Product.countDocuments(searchQuery)
        : totalCount;
      const totalPages = Math.ceil(searchCount / perPage);

      return NextResponse.json(
        { newarrilvalproduct, page, totalPages, totalCount: searchCount },
        { status: 200 }
      );
    }

    // BESTSELLER isBestSeller: true,
    if (newproduct === "bestseller") {
      const baseQuery: { [key: string]: any } = { isBestSeller: true };
      const totalCount = await Product.countDocuments(baseQuery);
      const searchQuery = { ...baseQuery };
      if (search) {
        const searchWords = search
          .split(" ")
          .map((word) => word.trim())
          .filter((word) => word);
        const regexPattern = searchWords
          .map((word) => `(?=.*${word})`)
          .join("");
        searchQuery["title"] = { $regex: regexPattern, $options: "i" };
      }

      const bestSellerProduct = await Product.find(searchQuery)
        .sort({ createdAt: -1 })
        .populate({ path: "category", model: Category })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
      const searchCount = search
        ? await Product.countDocuments(searchQuery)
        : totalCount;
      const totalPages = Math.ceil(searchCount / perPage);

      return NextResponse.json(
        { bestSellerProduct, page, totalPages, totalCount: searchCount },
        { status: 200 }
      );
    }

    if (cateFilter) {
      const categoryQuery = { category: cateFilter };
      const allproduct = await Product.find(categoryQuery)
        .sort({ createdAt: "desc" })
        .populate({ path: "category", model: Category });
      return NextResponse.json(allproduct, { status: 200 });
    }

    const allproduct = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "category", model: Category });

    return NextResponse.json(allproduct, { status: 200 });
  } catch (err) {
    console.log("[products_GET]", err);
    return NextResponse.json({ message: err }, { status: 500 });
  }
};

export const dynamic = "force-dynamic";
