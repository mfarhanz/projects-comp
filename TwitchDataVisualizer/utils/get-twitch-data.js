/**
 * Contains methods to get up-to-date values of streamer statistics using the Twitch API.
 */
const request = require('request');                     //references to associated file/module
require('dotenv').config();

module.exports.streamer_info = {                        //data buffer to hold and update values while creating a Streamer object 
    id: '',
    average_viewers: 0,
    curr_playing: '',
    follower_count: 0,
    view_count: 0,
    is_live: '',
    partnered: '',
    mature: '',
    lang: ''
};

/**
 * Gets OAuth Token to access Twitch's API.
 * @param url Corresponding URI endpoint held in .env file
 * @param callback Callback method to execute after getting token
 */
module.exports.getToken = (url, callback) => {
    let tokenData = request.post({  url: url,
                                    json: true,
                                    body: { client_id: process.env.CLIENT_ID,
                                            client_secret: process.env.CLIENT_SECRET,
                                            grant_type: 'client_credentials' }
                                }, (err, res, body) => {
                                    if (err) { 
                                        console.log(err);
                                    }
                                    callback(res);
                                });
};

/**
 * Gets user's unique Twitch streamer ID.
 * @param url Corresponding URI endpoint held in .env file
 * @param accessToken OAuth Token to access Twitch API
 * @param userName A string of the streamer's username
 * @param callback Callback method to execute after getting streamer ID
 */
module.exports.getStreamerID = (url, accessToken, userName, callback) => {
    let gameData = request.get({    url: encodeURI(url+'?login='+userName),
                                    method: 'GET',
                                    headers: {  'Client-ID': process.env.CLIENT_ID,
                                                'Authorization': 'Bearer '+accessToken  }
                                }, (err, res, body) => {
                                    if (err) {
                                        console.log(err);
                                        return null;
                                    }
                                    if((JSON.parse(body).data === undefined)||(JSON.parse(body).data.length == 0)){
                                       this.streamer_info.id = '';
                                    }
                                    else {
                                        id = JSON.parse(body).data[0].id;
                                        this.streamer_info.id = this.streamer_info.id.replace(this.streamer_info.id, id);
                                    }
                                    callback(res,userName);
                                });
};

/**
 * Gets user's current status on Twitch.
 * @param url Corresponding URI endpoint held in .env file
 * @param accessToken OAuth Token to access Twitch API
 * @param userName A string of the streamer's username
 * @param callback Callback method to execute after getting streamer's current status
 */
module.exports.getStatus = (url, accessToken, userName, callback) => {
    let gameData = request.get({    url: encodeURI(url+'?query='+userName+'&first=1'),
                                    method: 'GET',
                                    headers: {  'Client-ID': process.env.CLIENT_ID,
                                                'Authorization': 'Bearer '+accessToken  }
                                }, (err, res, body) => {
                                    if (err) { 
                                        console.log(err);
                                        return null;
                                    }
                                    if(this.streamer_info.id.length > 0 &&  JSON.parse(body).data !== undefined){
                                        check = JSON.parse(body).data[0].is_live;
                                        if(check == true){ 
                                            this.streamer_info.is_live = this.streamer_info.is_live.replace(this.streamer_info.is_live, 'True') }
                                        else { this.streamer_info.is_live = this.streamer_info.is_live.replace(this.streamer_info.is_live, 'False') }
                                    }
                                    else { this.streamer_info.is_live = ''; }
                                    callback(res,userName);
                                });
};

/**
 * Gets game or activity user is currently engaged with on Twitch.
 * @param url Corresponding URI endpoint held in .env file
 * @param accessToken OAuth Token to access Twitch API
 * @param userName A string of the streamer's username
 * @param callback Callback method to execute after getting the game the streamer is currently playing
 */
module.exports.getGame = (url, accessToken, userName, callback) => {
    let gameData = request.get({    url: encodeURI(url+'?query='+userName+'&first=1'),
                                    method: 'GET',
                                    headers: {  'Client-ID': process.env.CLIENT_ID,
                                                'Authorization': 'Bearer '+accessToken  }
                                }, (err, res, body) => {
                                    if (err) { 
                                        console.log(err);
                                        return null;
                                    }
                                    if(this.streamer_info.id.length > 0 && JSON.parse(body).data !== undefined){
                                        check = JSON.parse(body).data[0].is_live;
                                        if(check == true){ 
                                            this.streamer_info.curr_playing = this.streamer_info.curr_playing.replace(this.streamer_info.curr_playing, JSON.parse(body).data[0].game_name) }
                                        else { this.streamer_info.curr_playing = '' }
                                    }
                                    else{ this.streamer_info.curr_playing = ''; }
                                    callback(res,userName);
                                });
};

/**
 * Gets user's estimated average channel view count on Twitch. Note: This method executes only if user is live.
 * @param url Corresponding URI endpoint held in .env file
 * @param accessToken OAuth Token to access Twitch API
 * @param userId A string of the streamer's Twitch ID
 * @param callback Callback method to execute after getting streamer's estimated average daily views
 */
module.exports.getAverageViews = (url, accessToken, userId, callback) => {
    let gameData = request.get({    url: encodeURI(url+'?first=1&user_id='+userId),
                                    method: 'GET',
                                    headers: {  'Client-ID': process.env.CLIENT_ID,
                                                'Authorization': 'Bearer '+accessToken  }
                                }, (err, res, body) => {
                                    if (err) { 
                                        console.log(err);
                                        return null;
                                    }
                                    let name;
                                    try {
                                        if(this.streamer_info.id.length > 0 && JSON.parse(body).data.length > 0){
                                            if(this.streamer_info.is_live === 'True') { 
                                                val = JSON.parse(body).data[0].viewer_count; }
                                            else { val = 0; }
                                            this.streamer_info.average_viewers = val;
                                        }
                                        else { 
                                            this.streamer_info.average_viewers = 0; 
                                        }
                                        callback(res);
                                    } catch (error) {
                                        callback(res);
                                    }
                                });
};

/**
 * Gets user's current follower count on Twitch.
 * @param url Corresponding URI endpoint held in .env file
 * @param accessToken OAuth Token to access Twitch API
 * @param userId A string of the streamer's Twitch ID
 * @param callback Callback method to execute after getting streamer's follower count
 */
module.exports.getFollowerCount = (url, accessToken, userId, callback) => {
    let gameData = request.get({    url: encodeURI(url+'?to_id='+userId+'&first=1'),
                                    method: 'GET',
                                    headers: {  'Client-ID': process.env.CLIENT_ID,
                                                'Authorization': 'Bearer '+accessToken  }
                                }, (err, res, body) => {
                                    if (err) { 
                                        console.log(err);
                                        return null;
                                    }
                                    let name;
                                    try {
                                        if(this.streamer_info.id.length > 0 && JSON.parse(body).data.length > 0) {
                                            val = JSON.parse(body).total;
                                            name = JSON.parse(body).data[0].to_name;
                                            this.streamer_info.follower_count = val;
                                        }
                                        else { 
                                            this.streamer_info.follower_count = 0 ; 
                                            name = '';
                                        }
                                        callback(res,name);
                                    } catch (error) {
                                        callback(res,name);
                                    }
                                });
};
/**
 * Gets user's channel view count on Twitch.
 * @param url Corresponding URI endpoint held in .env file
 * @param accessToken OAuth Token to access Twitch API
 * @param userId A string of the streamer's Twitch ID
 * @param callback Callback method to execute after getting streamer's view count
 */
module.exports.getViewerCount = (url, accessToken, userId, callback) => {
    let gameData = request.get({    url: encodeURI(url+'?id='+userId),
                                    method: 'GET',
                                    headers: {  'Client-ID': process.env.CLIENT_ID,
                                                'Authorization': 'Bearer '+accessToken  }
                                }, (err, res, body) => {
                                    if (err) { 
                                        console.log(err);
                                        return null;
                                    }
                                    let name;
                                    try {
                                        if(this.streamer_info.id.length > 0 && JSON.parse(body).data[0].hasOwnProperty('view_count')){
                                            val = JSON.parse(body).data[0].view_count;
                                            name = JSON.parse(body).data[0].display_name;
                                            this.streamer_info.view_count = val;
                                        }
                                        else { 
                                            this.streamer_info.view_count = 0;
                                            name = '';
                                        }
                                        callback(res, name);
                                    } catch (error) {
                                        callback(res,name);
                                    }
                                });
};

/**
 * Gets user's current partnership staus on Twitch.
 * @param url Corresponding URI endpoint held in .env file
 * @param accessToken OAuth Token to access Twitch API
 * @param userName A string of the streamer's username
 * @param callback Callback method to execute after checking if streamer is partnered or not 
 */
module.exports.isPartnered = (url, accessToken, userName, callback) => {
    let gameData = request.get({    url: encodeURI(url+'?login='+userName),
                                    method: 'GET',
                                    headers: {  'Client-ID': process.env.CLIENT_ID,
                                                'Authorization': 'Bearer '+accessToken  }
                                }, (err, res, body) => {
                                    if (err) { 
                                        console.log(err);
                                        return null;
                                    }
                                    try {
                                        if(this.streamer_info.id.length > 0 && JSON.parse(body).data[0].hasOwnProperty('broadcaster_type')){
                                            ltype = JSON.parse(body).data[0].broadcaster_type;
                                            if(ltype === 'partner'){ 
                                                this.streamer_info.partnered = this.streamer_info.partnered.replace(this.streamer_info.partnered, 'True') }
                                            else { this.streamer_info.partnered = this.streamer_info.partnered.replace(this.streamer_info.partnered, 'False') }
                                        }
                                        else { this.streamer_info.partnered = ''; }
                                        callback(res,userName);
                                    } catch (error) {
                                        callback(res,userName);
                                    }
                                });
};

/**
 * Gets user's current stream's viewership status on Twitch, if it is intended for mature audiences.
 * @param url Corresponding URI endpoint held in .env file
 * @param accessToken OAuth Token to access Twitch API
 * @param userId A string of the streamer's Twitch ID
 * @param callback Callback method to execute after checking whether streamer's current stream is labelled mature
 */
module.exports.isMature = (url, accessToken, userId, callback) => {
    let gameData = request.get({    url: encodeURI(url+'?first=1&user_id='+userId),
                                    method: 'GET',
                                    headers: {  'Client-ID': process.env.CLIENT_ID,
                                                'Authorization': 'Bearer '+accessToken  }
                                }, (err, res, body) => {
                                    if (err) { 
                                        console.log(err);
                                        return null;
                                    }
                                    try {
                                        if(this.streamer_info.id.length > 0 && JSON.parse(body).data.length > 0){
                                            if(this.streamer_info.is_live === 'True'){
                                                check = JSON.parse(body).data[0].is_mature;
                                                if(check == true){ 
                                                    this.streamer_info.mature = this.streamer_info.mature.replace(this.streamer_info.mature, 'True') }
                                                else { this.streamer_info.mature = this.streamer_info.mature.replace(this.streamer_info.mature, 'False') }
                                            }
                                            else { this.streamer_info.mature = ''; }
                                        }
                                        else { 
                                            this.streamer_info.mature = ''; 
                                        }
                                        callback(res);
                                    } catch (error) {
                                        callback(res);
                                    }
                                });
};

/**
 * Gets user's channel language on Twitch.
 * @param url Corresponding URI endpoint held in .env file
 * @param accessToken OAuth Token to access Twitch API
 * @param userName A string of the streamer's username
 * @param callback Callback method to execute after getting streamer's channel language
 */
module.exports.getChannelLanguage = (url, accessToken, userName, callback) => {
    let gameData = request.get({    url: encodeURI(url+'?query='+userName+'&first=1'),
                                    method: 'GET',
                                    headers: {  'Client-ID': process.env.CLIENT_ID,
                                                'Authorization': 'Bearer '+accessToken  }
                                }, (err, res, body) => {
                                    if (err) { 
                                        console.log(err);
                                        return null;
                                    }
                                    if(this.streamer_info.id.length > 0 && JSON.parse(body).data !== undefined){
                                        val = JSON.parse(body).data[0].broadcaster_language;
                                        var lang = new Intl.DisplayNames(['en'], { type: 'language' });   //convert language code to corresponding language
                                        this.streamer_info.lang = this.streamer_info.lang.replace(this.streamer_info.lang, lang.of(val));
                                    }
                                    else { this.streamer_info.lang  = ''; }
                                    callback(res,userName);
                                });
};

