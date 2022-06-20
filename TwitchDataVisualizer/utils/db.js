/**
 * Contains methods for handling database instances.
 */
const MongoClient = require("mongodb").MongoClient                  //creating a new MongoDB instance
const uri ="mongodb://localhost:27017";
const client = new MongoClient(uri, { useUnifiedTopology: true });
var db;
/**
 * A function to stablish a connection with a MongoDB instance.
 */
async function connectToDB() {
    try {
        await client.connect();
        db = await client.db('twitch-db');
        console.log("Connected successfully to mongoDB");  
    } catch (err) {
        throw err;
    } 
}
/**
 * This method just returns the database instance
 * @returns A Database instance
 */
async function getDb() {
    return db;
}

async function closeDBConnection(){
    await client.close();
    return 'Connection closed';
};

module.exports = {connectToDB, getDb, closeDBConnection}