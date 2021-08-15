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
                $and: [
                  {
                    $lte: [ 
                      "$arrived",
                      {
                        $dateToString: 
                        {
                          date: {
                            $dateSubtract: 
                            {
                                startDate: { $toDate: req.query.date },
                                unit: "day",
                                amount: 23
                            }
                          }
                        }
                      }
                    ]
                  },
                  {
                    $gte: [ 
                      "$arrived",
                      {
                        $dateToString: 
                        {
                          date: {
                            $dateSubtract: 
                            {
                                startDate: { $toDate: req.query.date },
                                unit: "day",
                                amount: 30
                            }
                          }
                        }
                      }
                    ]
                  }
                ]
              } 
            }
          },
          {
            $sort:
            {
              arrived: 1
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
              arrived: 1,
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
                      { $toDate: req.query.date }
                    ] 
                  } 
                } 
              }
            }
          },
          {
            $group:
            {
              _id: "$vaccine",
              count: { $sum: { $subtract: ["$injections", { $size: "$vaccinations" } ] } }
            }
          }
        ]
      ).toArray();

    res.json(stats);
});

export default databaseHandler;

