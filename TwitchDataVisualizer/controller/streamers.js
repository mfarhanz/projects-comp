/**
 * Contains methods to handle Streamer objects.
 */
const v = require('../utils/validate-fields');                  //references to associated files/modules
const user_data = require('../utils/get-twitch-data');
const client = require('../utils/db.js');
const request = require('request');
const Streamer = require('../model/streamer').Streamer;
require('dotenv').config({path: './utils/.env'});

/**
 * Adds and saves a new Streamer object by invoking save() member function in Streamer
 * @param req A request object holding data of a user
 * @param res A resolve object holding the return data from Streamer.save() or an error message
 */
module.exports.add = async (req, res) => {
    let name = req.body.name;
    let watchtime = req.body.watchtime;
    let streamtime = req.body.streamtime; 
    let maxviewers = req.body.maxviewers;
    let isValid = await v.validate_fields(name, watchtime, streamtime, maxviewers);
    if (isValid){                                                          //validating the fields of the object to be created
        let new_streamer = new Streamer(name, parseInt(watchtime), parseInt(streamtime), parseInt(maxviewers));
        let msg = await new_streamer.save();
        res.send(msg); 
    } else {
        console.log('Streamer data was not inserted in the database since it is not valid.');
        res.send('Error. User not inserted in the database.');
    }
};

/**
 * Lists a sample of more relevant Streamer objects in a collection by invoking getSome() member function in Streamer
 * @param req Optional - A request object holding data of a user
 * @param res A resolve object holding the return data from Streamer.getSome()
 */
module.exports.list_sample = async (req, res) => {    
    let objs = await Streamer.getSome();
    console.log(objs.length+' item(s) sent.');
    res.send(objs);        
};

/**
 * Gets Streamer object(s) in a collection based on matching field(s), by invoking get() member function in Streamer
 * @param req A request object holding data of a user
 * @param res A resolve object holding the return data from Streamer.get() or an error message
 */
module.exports.get_streamer = async (req, res) => {
    let streamer_to_match = req.params.name;
    let obj = await Streamer.get(streamer_to_match);
    if (obj.length > 0){
        console.log(obj.length+' item(s) sent.');
        res.send(obj[0]);        
    }else{
        res.send('No item was found');
    }
};

/**
 * Updates a Streamer object in a collection based on matching field(s), by invoking update() member function in Streamer
 * @param req A request object holding data of a user
 * @param res A resolve object holding the return data from Streamer.update() or an error message
 */
module.exports.update_streamer = async (req, res) => {
    let streamer_to_match = req.params.name;
    let new_name = req.body.name;
    let watchtime = req.body.watchtime;
    let streamtime = req.body.streamtime; 
    let maxviewers = req.body.maxviewers;
    let isValid = await v.validate_fields(new_name, watchtime, streamtime, maxviewers);
    if (isValid){
        let msg = await Streamer.update(streamer_to_match, new Streamer(new_name, parseInt(watchtime), parseInt(streamtime), parseInt(maxviewers)))
        res.send(msg);
    } else {
        console.log("The document was not updated");
        let msg = 'The new user data is not valid.';
        res.send(msg);
    }
};

/**
 * Deletes a Streamer object in a collection based on matching field(s), by invoking delete() member function in Streamer
 * @param req A request object holding data of a user
 * @param res A resolve object holding the return data from Streamer.delete()
 */
module.exports.delete_streamer = async (req, res) => {
    let streamer_to_delete = req.params.name;
    let msg = await Streamer.delete(streamer_to_delete);
    console.log("The user data was deleted");
    res.send(msg);
};

