import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const databaseHandler = nextConnect();

databaseHandler.use(middleware);

databaseHandler.get(async (req, res) => {
    let orders = await req.db.collection("order").aggregate(
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
            $project:
              {
                _id: 0,
                id: 1,
                orderNumber: 1,
                responsiblePerson: 1,
                healthCareDistrict: 1,
                vaccine: 1,
                injections: 1,
                arrived: 1,
                usedInjections: { $size: "$vaccinations" }
              }
          }
        ]
      ).toArray();
    res.json(orders);
});

export default databaseHandler;