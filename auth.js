import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { userModel } from "./models/user-model";
import { dbConnect } from "./lib/dbConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: process.env.ENVIRONMENT,
  }),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        await dbConnect();
        const user = await userModel.findOne({ email: credentials.username });
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) throw new Error("Email or password mismatch");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
});