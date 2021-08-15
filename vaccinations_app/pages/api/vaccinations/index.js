import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const databaseHandler = nextConnect();

databaseHandler.use(middleware);

databaseHandler.get(async (req, res) => {
    let vaccinations = await req.db.collection('vaccination').find({}).toArray();
    res.json(vaccinations);
});

export default databaseHandler;