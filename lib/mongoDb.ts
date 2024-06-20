import mongoose from "mongoose";

let isConnect: boolean = false;
export const connectionToDb = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnect) {
    console.log("MDB is already Connect");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: "Banboon",
    });

    isConnect = true;
    console.log("MDB is Connect");
  } catch (err) {
    console.log(err);
  }
};
