import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { userModel } from "@/models/user-model";
import { dbConnect } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const { fname, lname, email, password } = await req.json();

    if (!fname || !lname || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    await dbConnect();

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name: `${fname} ${lname}`,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
