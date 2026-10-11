
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import clientPromise from "@/lib/mongodb";

const client = await clientPromise;

export const auth = betterAuth({
  database: mongodbAdapter(
    client.db(process.env.MONGODB_DB || "bazardor"),
    { client }
  ),

  emailAndPassword: {
    enabled: true,
  },

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});