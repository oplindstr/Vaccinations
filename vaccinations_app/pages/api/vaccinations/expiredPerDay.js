import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const databaseHandler = nextConnect();

databaseHandler.use(middleware);

databaseHandler.get(async (req, res) => {
    let counts = await req.db.collection('order').aggregate(
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
              injections: 1,
              expired: 
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
              }, 
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
              _id: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$expired" }}},
              vaccinationsExpired: { $sum: { $subtract: ["$injections", { $size: "$vaccinations" } ] } }
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