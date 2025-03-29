import { MongoClient } from "mongodb";

const MONGODB_URI =
  "mongodb+srv://ppp_0123:abcoohegom@cluster0.6jwiqha.mongodb.net/";

const MONGODB_DB = "drsystemdatabase";

//Checking MongoDB URI is defined or not
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  //Check whether already have a connection
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  //Create a new connection
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);

  //Cache the connection
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
