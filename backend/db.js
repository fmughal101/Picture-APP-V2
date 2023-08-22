import { MongoClient, ServerApiVersion } from "mongodb";

let db;

const connectToDB = async (cb) => {
  const uri = "had to change for security reasons";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  await client.connect();
  db = client.db("PictureAPPdb");
  cb();
};

export { db, connectToDB };
