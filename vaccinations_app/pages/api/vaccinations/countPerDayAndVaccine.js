import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const databaseHandler = nextConnect();

databaseHandler.use(middleware);

databaseHandler.get(async (req, res) => {
    let counts = await req.db.collection('vaccination').aggregate(
        [
          {
            $lookup:
              {
                from: "order",
                localField: "sourceBottle",
                foreignField: "id",
                as: "order"
              }
          },
          {
              $unwind: "$order"
          },
          {
              $group: 
              {
                  _id: { vaccine: "$order.vaccine", date: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$vaccinationDate" } }}},
                  count: { $sum: 1 }
              }
          },
          {
              $sort:
              {
                  "_id.date": 1,
                  "_id.vaccine": 1
              }
          }
        ]
      ).toArray();

    res.json(counts);
});

export default databaseHandler;