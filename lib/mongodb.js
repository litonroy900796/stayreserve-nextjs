import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_CONNECTION_STRING;
const options = {};

if (!process.env.MONGODB_CONNECTION_STRING) {
  throw new Error("Please add MONGODB_CONNECTION_STRING to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
