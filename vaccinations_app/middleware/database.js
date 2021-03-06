import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient(process.env.DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  await client.connect();
  req.dbClient = client;
  req.db = client.db(process.env.DATABASE_NAME);
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;