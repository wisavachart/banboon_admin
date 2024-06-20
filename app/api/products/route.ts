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
      media,
      category,
      price,
      statusPublish,
      isNewArrival,
    } = await req.json();

    if (!title || !description || !media || !category || !price) {
      return new NextResponse("Not enought data to create a product", {
        status: 500,
      });
    }

    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      price,
      statusPublish,
      isNewArrival,
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
export const GET = async (req: NextRequest) => {
  try {
    await connectionToDb();
    const product = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "category", model: Category });

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.log("[products_GET]", err);
    return NextResponse.json({ message: err }, { status: 500 });
  }
};
export const dynamic = "force-dynamic";
