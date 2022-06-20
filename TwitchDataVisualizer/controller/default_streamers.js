/**
 * Contains one method to return Streamer objects from a collection.
 */
 const client = require('../utils/db.js');
 const request = require('request');
 const Streamer = require('../model/streamer').Streamer;

 /**
 * Lists all Streamer objects in a collection by invoking getAll() member function in Streamer
 * @param req Optional - A request object holding data of a user
 * @param res A resolve object holding the return data from Streamer.getSome()
 */
module.exports.list_all = async (req, res) => {   
    let objs = await Streamer.getAll();
    console.log(objs.length+' item(s) sent.');
    res.send(objs);        
};
