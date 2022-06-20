/**
 * Defines a Streamer Model with its associated operations.
 */

const user_data = require('../utils/get-twitch-data');          //references to the objects in associated files/modules
const client = require('../utils/db.js');
const request = require('request');
require('dotenv').config({path: './utils/.env'});

/**
 * Gets, or creates if not already existing, a streamers collection from a database instance.
 * @returns 'streamers' collection from a database instance
 */
async function _get_streamers_collection (){
    let db = await client.getDb();
    return await db.collection('streamers');
};

class Streamer {
    constructor(name, watchtime, streamtime, maxviewers){
        this.id = '';
        this.name = name;
        this.watchtime = watchtime;
        this.streamtime = streamtime;
        this.maxviewers = maxviewers;
        this.avgviewers = 0;                //default parameters--
        this.followers = 0;
        this.viewcount = 0;
        this.islive = '';
        this.currplaying = '';
        this.partnered = '';
        this.mature = '';
        this.lang = '';
    }

    /**
     * Updates applicable fields of new Streamer objects before adding them to the collection instance.
     * @param collection A collection instance from a database 
     */
    async getdata(collection){
        let curr_obj = {
            id: '',
            name: '',
            avgviewers: 0,
            followers: 0,
            viewcount: 0,
            islive: '',
            currplaying: '',
            partnered: '',
            mature: '',
            lang: ''
        }
        user_data.getToken(process.env.GET_TOKEN,(res) => {                                //calling each of the Twitch API functions in
            var AT = res.body.access_token;                                                //order, via callbacks, to get the current
            user_data.getStreamerID(process.env.GET_USER,AT,this.name,(res,name) =>{       //values for the object based on the 'name'
                this.id = user_data.streamer_info.id                                       //field
                curr_obj.id = this.id;
                user_data.isPartnered(process.env.GET_USER,AT,name,(res,name) =>{
                    user_data.streamer_info.id = curr_obj.id;
                    this.partnered = user_data.streamer_info.partnered;
                    curr_obj.partnered = this.partnered;
                    user_data.getViewerCount(process.env.GET_USER,AT,user_data.streamer_info.id,(res,name) =>{
                        user_data.streamer_info.id = curr_obj.id;
                        user_data.streamer_info.partnered = curr_obj.partnered;
                        this.viewcount = user_data.streamer_info.view_count;
                        curr_obj.viewcount = this.viewcount;
                        user_data.getFollowerCount(process.env.GET_FOLLOWS,AT,user_data.streamer_info.id,(res,name) =>{
                            user_data.streamer_info.id = curr_obj.id;
                            user_data.streamer_info.partnered = curr_obj.partnered;
                            user_data.streamer_info.view_count = curr_obj.viewcount;
                            this.followers = user_data.streamer_info.follower_count;
                            curr_obj.followers = this.followers;
                            user_data.getStatus(process.env.SEARCH_CHANNEL,AT,name,(res,name) =>{
                                user_data.streamer_info.id = curr_obj.id;
                                user_data.streamer_info.partnered = curr_obj.partnered;
                                user_data.streamer_info.view_count = curr_obj.viewcount;
                                user_data.streamer_info.follower_count = curr_obj.followers;
                                this.islive = user_data.streamer_info.is_live;
                                curr_obj.islive = this.islive;
                                user_data.getGame(process.env.SEARCH_CHANNEL,AT,name,(res,name) =>{
                                    user_data.streamer_info.id = curr_obj.id;
                                    user_data.streamer_info.partnered = curr_obj.partnered;
                                    user_data.streamer_info.view_count = curr_obj.viewcount;
                                    user_data.streamer_info.follower_count = curr_obj.followers;
                                    user_data.streamer_info.is_live = curr_obj.islive;
                                    this.currplaying = user_data.streamer_info.curr_playing;
                                    curr_obj.currplaying = this.currplaying;
                                    user_data.getAverageViews(process.env.GET_STREAMS,AT,user_data.streamer_info.id,(res) =>{
                                        user_data.streamer_info.id = curr_obj.id;
                                        user_data.streamer_info.partnered = curr_obj.partnered;
                                        user_data.streamer_info.view_count = curr_obj.viewcount;
                                        user_data.streamer_info.follower_count = curr_obj.followers;
                                        user_data.streamer_info.is_live = curr_obj.islive;
                                        user_data.streamer_info.curr_playing = curr_obj.currplaying;
                                        this.avgviewers = user_data.streamer_info.average_viewers;
                                        curr_obj.avgviewers = this.avgviewers;
                                        user_data.isMature(process.env.GET_STREAMS,AT,user_data.streamer_info.id,(res) =>{
                                            user_data.streamer_info.id = curr_obj.id;
                                            user_data.streamer_info.partnered = curr_obj.partnered;
                                            user_data.streamer_info.view_count = curr_obj.viewcount;
                                            user_data.streamer_info.follower_count = curr_obj.followers;
                                            user_data.streamer_info.is_live = curr_obj.islive;
                                            user_data.streamer_info.curr_playing = curr_obj.currplaying;
                                            user_data.streamer_info.average_viewers = curr_obj.avgviewers;    
                                            this.mature = user_data.streamer_info.mature;
                                            curr_obj.mature = this.mature;
                                            user_data.getChannelLanguage(process.env.SEARCH_CHANNEL,AT,name, async (res,name) =>{
                                                user_data.streamer_info.id = curr_obj.id;
                                                user_data.streamer_info.partnered = curr_obj.partnered;
                                                user_data.streamer_info.view_count = curr_obj.viewcount;
                                                user_data.streamer_info.follower_count = curr_obj.followers;
                                                user_data.streamer_info.is_live = curr_obj.islive;
                                                user_data.streamer_info.curr_playing = curr_obj.currplaying;
                                                user_data.streamer_info.average_viewers = curr_obj.avgviewers;
                                                user_data.streamer_info.mature = curr_obj.mature;
                                                this.lang = user_data.streamer_info.lang;
                                                curr_obj.lang = this.lang;
                                                let ref = collection;
                                                let mongoObj = await ref.insertOne(this);   //inserting the final object into the collection
                                                console.log('1 Object was inserted in the database with id -> '+mongoObj.insertedId);
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    /**
     * Saves updated Streamer objects into a created 'streamers' collection.
     * @returns A message confirming the object was added to the collection
     */
    async save(){
        try {
            let collection = await _get_streamers_collection();
            await this.getdata(collection).then(() => {
                return 'Streamer data correctly inserted in the Database.';
            })
        } catch (err) {
            throw err;
        }
    }

    /**
     * Gets a sample of the more relevant documents from a collection reference, and updates them asynchonously every time it is called.
     * @returns An array of JSON objects from the collection
     */
    static async getSome(){              
        let collection = await _get_streamers_collection();
        let objs = await collection.find({}).limit(100).toArray();
        user_data.getToken(process.env.GET_TOKEN, async (res) => {
            var AT = res.body.access_token;
            for(let i = 0; i < objs.length; i++) {              //updating each document in the collection array before it can
                let object = objs[i];                           //be sent to the client, in case it is outdated in the dataset
                if(!object.name.match(/\(([^)]+)\)/)) { object.name = object.name.match(/^[a-zA-Z0-9_]+$/)[0]; }
                if(!object.name.match(/^[a-zA-Z0-9_]+$/)) { 
                    await collection.deleteOne({'name': object.name});
                }
                user_data.getStreamerID(process.env.GET_USER,AT,object.name,(res,name) =>{
                    if(JSON.parse(res.body).data === undefined || JSON.parse(res.body).data.length == 0) { return; }
                    object.id = user_data.streamer_info.id
                    user_data.isPartnered(process.env.GET_USER,AT,name,(res,name) =>{
                        user_data.streamer_info.id = object.id;
                        object.partnered = user_data.streamer_info.partnered;
                        user_data.getViewerCount(process.env.GET_USER,AT,user_data.streamer_info.id,(res,name) =>{
                            user_data.streamer_info.id = object.id;
                            user_data.streamer_info.partnered = object.partnered;
                            if(JSON.parse(res.body).length == 0 || JSON.parse(res.body) === undefined || JSON.parse(res.body).data === undefined) { return; }
                            object.viewcount = JSON.parse(res.body).data[0].view_count;
                            user_data.getFollowerCount(process.env.GET_FOLLOWS,AT,user_data.streamer_info.id,(res,name) =>{
                                user_data.streamer_info.id = object.id;
                                user_data.streamer_info.partnered = object.partnered;
                                user_data.streamer_info.view_count = object.viewcount;
                                object.followers = JSON.parse(res.body).total;
                                user_data.getStatus(process.env.SEARCH_CHANNEL,AT,name,(res,name) =>{
                                    user_data.streamer_info.id = object.id;
                                    user_data.streamer_info.partnered = object.partnered;
                                    user_data.streamer_info.view_count = object.viewcount;
                                    user_data.streamer_info.follower_count = object.followers;
                                    if(JSON.parse(res.body).length == 0 || JSON.parse(res.body) === undefined || JSON.parse(res.body).data === undefined) { return; }
                                    if(JSON.parse(res.body).data[0].is_live) {
                                        object.islive = user_data.streamer_info.is_live.replace(user_data.streamer_info.is_live, 'True'); }
                                    else { object.islive = user_data.streamer_info.is_live.replace(user_data.streamer_info.is_live, 'False'); }
                                    user_data.getGame(process.env.SEARCH_CHANNEL,AT,name,(res,name) =>{
                                        user_data.streamer_info.id = object.id;
                                        user_data.streamer_info.partnered = object.partnered;
                                        user_data.streamer_info.view_count = object.viewcount;
                                        user_data.streamer_info.follower_count = object.followers;
                                        user_data.streamer_info.is_live = object.islive;
                                        if(JSON.parse(res.body).length == 0 || JSON.parse(res.body) === undefined || JSON.parse(res.body).data === undefined) { return; }
                                        if(object.islive === 'True' && JSON.parse(res.body).data !== undefined) {
                                            object.currplaying = user_data.streamer_info.curr_playing.replace(user_data.streamer_info.curr_playing,JSON.parse(res.body).data[0].game_name); }
                                        else { object.currplaying = ''; }
                                        user_data.getAverageViews(process.env.GET_STREAMS,AT,user_data.streamer_info.id, async (res) =>{
                                            user_data.streamer_info.id = object.id;
                                            user_data.streamer_info.partnered = object.partnered;
                                            user_data.streamer_info.view_count = object.viewcount;
                                            user_data.streamer_info.follower_count = object.followers;
                                            user_data.streamer_info.is_live = object.islive;
                                            user_data.streamer_info.curr_playing = object.currplaying;
                                            if(JSON.parse(res.body).length == 0 || JSON.parse(res.body) === undefined || JSON.parse(res.body).data === undefined) { return; }
                                            if(object.islive === 'True' && JSON.parse(res.body).data.length > 0) {
                                                object.avgviewers = JSON.parse(res.body).data[0].viewer_count; }
                                            let updated = {$set: {  'avgviewers': object.avgviewers, 
                                                                    'followers': object.followers, 
                                                                    'viewcount': object.viewcount, 
                                                                    'islive': object.islive,
                                                                    'currplaying': object.currplaying,
                                                                    'partnered': object.partnered}};
                                            await collection.updateOne({'name': object.name}, updated) 
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            }
        });
        return objs;
    }

    /**
     * Gets all documents from a collection reference.
     * @returns An array of JSON objects from the collection
     */
    static async getAll(){              
        let collection = await _get_streamers_collection();
        let objs = await collection.find({}).toArray();
        return objs;
    }

    /**
     * Gets document(s) which match the 'name' field from a collection reference.
     * @param name A string of a user's name
     * @returns An array of JSON object(s) from the collection
     */
    static async get(name){
        let collection = await _get_streamers_collection();
        let obj = await collection.find({"name": name}).toArray();
        return obj;
    }

    /**
     * Updates the first document with parameter matching the 'name' field from a collection reference.
     * In addition, updates non-user entered fields, you will need to call 'find' again to update this data.
     * @param name A string of a user's name
     * @param updated An object with the field values to update the found object with
     * @returns A message confirming the object was updated in the collection
     */
    static async update(name, updated){
        let collection = await _get_streamers_collection();
        let objs = await this.get(name);
        let object = objs[0];
        user_data.getToken(process.env.GET_TOKEN, async (res) => {
            var AT = res.body.access_token;
            user_data.getStreamerID(process.env.GET_USER,AT,object.name,(res,name) =>{
                if(JSON.parse(res.body).data === undefined || JSON.parse(res.body).data.length == 0) { return; }
                object.id = user_data.streamer_info.id
                user_data.isPartnered(process.env.GET_USER,AT,name,(res,name) =>{
                    user_data.streamer_info.id = object.id;
                    object.partnered = user_data.streamer_info.partnered;
                    user_data.getViewerCount(process.env.GET_USER,AT,user_data.streamer_info.id,(res,name) =>{
                        user_data.streamer_info.id = object.id;
                        user_data.streamer_info.partnered = object.partnered;
                        if(JSON.parse(res.body).length == 0 || JSON.parse(res.body) === undefined || JSON.parse(res.body).data === undefined) { return; }
                        object.viewcount = JSON.parse(res.body).data[0].view_count;
                        user_data.getFollowerCount(process.env.GET_FOLLOWS,AT,user_data.streamer_info.id,(res,name) =>{
                            user_data.streamer_info.id = object.id;
                            user_data.streamer_info.partnered = object.partnered;
                            user_data.streamer_info.view_count = object.viewcount;
                            object.followers = JSON.parse(res.body).total;
                            user_data.getStatus(process.env.SEARCH_CHANNEL,AT,name,(res,name) =>{
                                user_data.streamer_info.id = object.id;
                                user_data.streamer_info.partnered = object.partnered;
                                user_data.streamer_info.view_count = object.viewcount;
                                user_data.streamer_info.follower_count = object.followers;
                                if(JSON.parse(res.body).length == 0 || JSON.parse(res.body) === undefined || JSON.parse(res.body).data === undefined) { return; }
                                if(JSON.parse(res.body).data[0].is_live) {
                                    object.islive = user_data.streamer_info.is_live.replace(user_data.streamer_info.is_live, 'True'); }
                                else { object.islive = user_data.streamer_info.is_live.replace(user_data.streamer_info.is_live, 'False'); }
                                user_data.getGame(process.env.SEARCH_CHANNEL,AT,name,(res,name) =>{
                                    user_data.streamer_info.id = object.id;
                                    user_data.streamer_info.partnered = object.partnered;
                                    user_data.streamer_info.view_count = object.viewcount;
                                    user_data.streamer_info.follower_count = object.followers;
                                    user_data.streamer_info.is_live = object.islive;
                                    if(JSON.parse(res.body).length == 0 || JSON.parse(res.body) === undefined || JSON.parse(res.body).data === undefined) { return; }
                                    if(object.islive === 'True' && JSON.parse(res.body).data !== undefined) {
                                        object.currplaying = user_data.streamer_info.curr_playing.replace(user_data.streamer_info.curr_playing,JSON.parse(res.body).data[0].game_name); }
                                    else { object.currplaying = ''; }
                                    user_data.getAverageViews(process.env.GET_STREAMS,AT,user_data.streamer_info.id, async (res) =>{
                                        user_data.streamer_info.id = object.id;
                                        user_data.streamer_info.partnered = object.partnered;
                                        user_data.streamer_info.view_count = object.viewcount;
                                        user_data.streamer_info.follower_count = object.followers;
                                        user_data.streamer_info.is_live = object.islive;
                                        user_data.streamer_info.curr_playing = object.currplaying;
                                        if(JSON.parse(res.body).length == 0 || JSON.parse(res.body) === undefined || JSON.parse(res.body).data === undefined) { return; }
                                        if(object.islive === 'True' && JSON.parse(res.body).data.length > 0) {
                                            object.avgviewers = JSON.parse(res.body).data[0].viewer_count; }
                                        let new_vals = {$set: { 'name': updated.name, 
                                                                'watchtime': updated.watchtime, 
                                                                'streamtime': updated.streamtime, 
                                                                'maxviewers': updated.maxviewers,
                                                                'avgviewers': object.avgviewers, 
                                                                'followers': object.followers, 
                                                                'viewcount': object.viewcount, 
                                                                'islive': object.islive,
                                                                'currplaying': object.currplaying,
                                                                'partnered': object.partnered}};
                                        let obj = await collection.updateOne({'name': name}, new_vals)
                                        if (obj.modifiedCount > 0){
                                            return 'Streamer data correctly updated.';
                                        }else{
                                            return 'Streamer data was not updated'
                                        }
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    /**
     * Deletes the first document with parameter matching the 'name' field from a collection reference.
     * @param streamer_to_delete A string of a user's name
     * @returns A message confirming the object was deleted from the collection 
     */
    static async delete(streamer_to_delete){
        let collection = await _get_streamers_collection();
        let obj = await collection.deleteOne({'name': streamer_to_delete})
        if (obj.deletedCount > 0){
            return 'Streamer data was deleted.'
        }else{
            return 'Streamer data was not found'
        }
    }
}

module.exports.Streamer = Streamer;
