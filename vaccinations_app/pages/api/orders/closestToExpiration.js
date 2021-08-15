import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const databaseHandler = nextConnect();

databaseHandler.use(middleware);

databaseHandler.get(async (req, res) => {
    let orders = await req.db.collection('order').aggregate(
        [
          { 
            $match: 
            { 
              $expr: 
              {
                $gt: 
                [ 
                  "$arrived", 
                  {
                    $dateToString: 
                    {
                      date: {
                        $dateSubtract: {
                          startDate: { $toDate: req.query.date },
                          unit: "day",
                          amount: 30
                        }
                      }
                    }
                  }
                ]
              }
            }
          },
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
                  orderNumber: 1,
                  responsiblePerson: 1,
                  healthCareDistrict: 1,
                  vaccine: 1,
                  injectionsLeft:
                  {
                      $subtract: ["$injections", { $size: "$vaccinations" }]
                  },
                  expireTime:
                  {
                    $dateToString: 
                    {
                      date: {
                        $dateAdd: {
                          startDate: { $toDate: "$arrived" },
                          unit: "day",
                          amount: 30
                        }
                      }
                    }
                  }
              }
          },
          {
              $sort:
              {
                  expireTime: 1
              }
          },
          {
              $limit: 10
          }
        ]
      ).toArray();
    res.json(orders);
});

export default databaseHandler;