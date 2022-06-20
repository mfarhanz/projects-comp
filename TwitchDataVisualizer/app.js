/**
 * Driver file initialising startup and termination of the server and database, listing resource paths for API methods,
 * and uploading CSV contents of Twitch data from a given file.
 */
const file_name = 'twitchdata.csv';               //references to associated files/modules
const express = require('express');
const csvtojson = require('csvtojson');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());        // support json encoded bodies
app.use(express.urlencoded({extended: true}));  //incoming objects are strings or arrays

app.use(express.static(__dirname + '/view'));   //connecting js with jquery/html/css in view folder

const default_streamers = require('./controller/default_streamers');
const streamers = require('./controller/streamers');
const mongo = require('./utils/db.js');

var db;               // database instance
var collection;       // collection reference within the database
var server;
var jsonArray = [];   // array holding streamer data from the supplied CSV file, as a JSON object

/**
 * Gets an existing streamers collection from a database instance.
 * @returns 'streamers' collection from a database instance
 */
async function _get_streamers_collection (db){
  return await db.collection('streamers');
};

/**
 * Creates and hosts a server to have a MongoDB instance along with path definitions to corresponding API methods. 
 */
async function createServer(){
  try {
    await mongo.connectToDB();
    db = await mongo.getDb();
    db.listCollections().toArray((async function(err, names) {              // check if streamers collections already exists
      if(names.length > 0) { await _get_streamers_collection(db); }
      else {
        csvtojson().fromFile(file_name).then(source => {
          for(var i = 0; i < source.length; i++){
            var row = {                                                 // parsing CSV contents into JSON array
              name: source[i]["Channel"],
              watchtime: parseInt(source[i]["Watch time(Minutes)"]/60),
              streamtime: parseInt(source[i]["Stream time(minutes)"]/60),
              maxviewers: parseInt(source[i]["Peak viewers"]),
              avgviewers: parseInt(source[i]["Average viewers"]),
              followers: parseInt(source[i]["Followers"]),
              viewcount: parseInt(source[i]["Views gained"]),
              partnered: source[i]["Partnered"],
              mature: source[i]["Mature"],
              lang: source[i]["Language"],
            };
            jsonArray.push(row);
          }
          collection = db.collection('streamers');                      // creating a streamers collection using the JSON array
          collection.insertMany(jsonArray, (err, result) => {
            if(err) { console.log(err); }
            if(result) { console.log("CSV imported into database"); }
          });
        });
      }
    }));
    app.get('/streamers', streamers.list_sample);                      // streamers.js resource paths
    app.get('/default_streamers', default_streamers.list_all); 
    app.get('/streamers/:name', streamers.get_streamer);
    app.post('/streamers', streamers.add);
    app.put('/streamers/:name', streamers.update_streamer);
    app.delete('/streamers/:name', streamers.delete_streamer);
    server = app.listen(port, () => {
      console.log('App listening at http://localhost:%d', port);
    });
  }catch(err){
    console.log(err)
  }
}
createServer();

process.on('SIGINT', () => {                  // callback function that terminates MongoDB connection upon certain incoming
  console.info('SIGINT signal received.');    // keyboard signals, eg. using CTRL+C for instance
  console.log('Closing Mongo Client.');
  server.close(async function(){
    let msg = await mongo.closeDBConnection()   ;
    console.log(msg);
  });
});
