import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing");
}

const globalForMongo = globalThis;

let client;
let clientPromise;

if (!globalForMongo._mongoClientPromise) {
  client = new MongoClient(uri);
  globalForMongo._mongoClientPromise = client.connect();
}

clientPromise = globalForMongo._mongoClientPromise;

const mongoClient = await clientPromise;
const db = mongoClient.db("test-2");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client: mongoClient }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      enabled: true,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 7,
    },
  },

  plugins: [jwt()],
});
