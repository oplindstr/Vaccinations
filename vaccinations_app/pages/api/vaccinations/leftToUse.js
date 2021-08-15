import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const databaseHandler = nextConnect();

databaseHandler.use(middleware);

databaseHandler.get(async (req, res) => {
    let counts = await req.db.collection('order').aggregate(
        [
          { 
            $match: 
            { 
              $expr: 
              {
                $and:
                  [
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
                    },
                    {
                      $lt: 
                      [ 
                        "$arrived", 
                        {
                          $dateToString: 
                          {
                            date: { $toDate: req.query.date }
                          }
                        }
                      ]
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
                              date: { $toDate: req.query.date }
                            }
                          } 
                        ] 
                      } 
                    } 
                  }
              }
          },
          {
            $project:
            {
              vaccine: 1,
              injectionsLeft: { $subtract: ["$injections", { $size: "$vaccinations" }]}
            }
          },
          {
            $group:
            {
              _id: "$vaccine",
              count: { $sum: "$injectionsLeft" }
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
    res.json(counts);
});

export default databaseHandler;