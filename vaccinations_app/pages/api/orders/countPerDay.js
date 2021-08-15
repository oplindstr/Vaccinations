import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const databaseHandler = nextConnect();

databaseHandler.use(middleware);

databaseHandler.get(async (req, res) => {
    let counts = await req.db.collection('order').aggregate(
        [
          {
            $group:
              {
                _id: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$arrived" } } },
                count: { $sum: 1 }
              }
          },
          { 
            $sort : 
              { 
                _id : 1 
              } 
          }
        ]
      ).toArray();

    res.json(counts);
});

export default databaseHandler;