import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const databaseHandler = nextConnect();

databaseHandler.use(middleware);

databaseHandler.get(async (req, res) => {
    let stats = await req.db.collection('order').aggregate(
        [
          { 
            $match: 
            { 
              $expr: 
              {
                $lt: 
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
              vaccine: 1,
              injections: 1,
              vaccinations: 
              { 
                $filter: 
                { 
                  input: "$vaccinations", 
                  as: "vaccinations", 
                  cond: 
                  { 
                    $lte: 
                    [ 
                      "$$vaccinations.vaccinationDate", 
                      {
                        $dateToString: {
                          date: {
                              $dateAdd: {
                              startDate: { $toDate: "$arrived" },
                              unit: "day",
                              amount: 30
                            }
                          }
                        }
                      } 
                    ] 
                  } 
                } 
              }
            }
          },
          {
            $group: {
              _id: "$vaccine",
              vaccinationsExpired: { $sum: { $subtract: ["$injections", { $size: "$vaccinations" } ] } },
              vaccinationsGivenInTime: {$sum: { $size: "$vaccinations" }},
              totalInjections: {$sum: "$injections"}
            }
          },
          {
            $sort: 
            {
              _id: 1
            }
          }
        ]
      ).toArray();

    res.json(stats);
});

export default databaseHandler;