import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(process.env.MONGODB_URI!).connect();
    }
    return global._mongoClientPromise;
  }
  return new MongoClient(process.env.MONGODB_URI!).connect();
}

export default getClientPromise;
