
var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb+srv://testUser:test123@cluster0.uzzbl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let find = '';
let collection = '';
async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    const blogs = client.db('my_blogs');
    collection = blogs.collection('blogs');

    const query = {name:"yossi"};
    find = await collection.findOne(query);
    console.log("Connected successfully to server");
  } catch (e) {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.setHeader({ 'Content-Type': 'application/json' }, 200)
  next();
});
router.route('/posts')
  .get((req, res, next) => {
    res.status(200).send({ find });
    next();
  })
  .post(async (req, res) => {
    let doc = req.body;
    await collection.insertOne(doc);
    res.redirect('/')
  });


module.exports = router;
