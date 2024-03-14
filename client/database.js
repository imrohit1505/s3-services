const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://rr150500:I@love15study@s3-services.ftx2any.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function createConnection() {
  try {

    return await new Promise((resolve, reject) => {
        return client.connect(
          uri,
          { useNewUrlParser: true, useUnifiedTopology: true },
          (err, res) => {
            if (!err) {
              resolve(res);
            } else {
              Log.error(`DB: Database connection creation is failed: URL ${uri}, Error:${JSON.stringify(err)}`);
              reject(null);
            }
          }
        );
      });
    // await client.connect();

    // const database = client.db('s3-services');
    // const movies = database.collection('movies');

    // // Query for a movie that has the title 'Back to the Future'
    // const query = { title: 'Back to the Future' };
    // const movie = await movies.findOne(query);

    // console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
createConnection();