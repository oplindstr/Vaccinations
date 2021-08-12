import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const databaseHandler = nextConnect();

databaseHandler.use(middleware);

databaseHandler.get(async (req, res) => {
    let orders = await req.db.collection('order').find({}).toArray();
    res.json(orders);
});

export default databaseHandler;