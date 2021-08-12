import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const databaseHandler = nextConnect();

databaseHandler.use(middleware);

databaseHandler.get(async (req, res) => {
    let count = await req.db.collection('order').countDocuments({});
    res.json(count);
});

export default databaseHandler;