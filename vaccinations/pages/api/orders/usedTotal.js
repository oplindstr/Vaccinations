import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const databaseHandler = nextConnect();

databaseHandler.use(middleware);

databaseHandler.get(async (req, res) => {
    let orders = await req.db.collection('order').aggregate(
        [
          {
            $lookup:
              {
                from: "vaccination",
                localField: "id",
                foreignField: "sourceBottle",
                as: "vaccinations"
              }
          },
          {
            $group:
              {
                _id: null,
                 vaccinationsUsed: { $sum: { $subtract: [ "$injections", { $size : "$vaccinations"}] } }
              }
          }
        ]
      ).toArray();
    res.json(orders);
});

export default databaseHandler;