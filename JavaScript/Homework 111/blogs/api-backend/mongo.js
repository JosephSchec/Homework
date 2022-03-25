const Mongo = require("mongodb");
const MongoClient = Mongo.MongoClient;
const getPost = async () => {
    const uri =
        'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    await client.connect();
    const database = client.db('blogs');
    return database.collection('posts');

}






module.exports = getPost;