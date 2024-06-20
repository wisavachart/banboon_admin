import Category from "@/lib/models/Category";
import { connectionToDb } from "@/lib/mongoDb";
// import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectionToDb();
    const { title, description, image } = await req.json();
    const exittigCollection = await Category.findOne({ title });
    if (exittigCollection) {
      return new NextResponse("Collection already exits", { status: 400 });
    }
    // if (!title || !image) {
    //   return new NextResponse("Title and image are required", { status: 400 });
    // }
    const newCollection = await Category.create({
      title,
      description,
      image,
    });
    await newCollection.save();
    return NextResponse.json(newCollection, { status: 200 });
  } catch (err) {
    console.log("[Collections_POST]", err);

    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectionToDb();
    const catagory = await Category.find().sort({ createdAt: "desc" });
    return NextResponse.json(catagory, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
