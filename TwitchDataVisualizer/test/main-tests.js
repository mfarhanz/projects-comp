/**
 * Mocha tests for various scenarios while using the database.
 */
var assert = require('assert');                                         //references to objects in other files/modules
const { Streamer } = require('../model/streamer');
const validation = require('../utils/validate-fields')
const axios = require('axios');
var myurl = 'http://localhost:3000';           
const instance = axios.create({                                         //creating an axios instance with given format
    baseURL: myurl,
    timeout: 6000,
    headers: {'content-type': 'application/json'}
});

describe('Twitch Dataset Ops - Mocha Tests', function(){
    describe('Test Models', function(){
        describe('Streamer', function(){
            let sname = 'deethree';
            let swatchtime = '244422';
            let sstreamtime = '7003';
            let smaxviewers = '422';
            var streamer = new Streamer(sname, swatchtime, sstreamtime, smaxviewers);       
            it('Test creation of a valid user with parameter matching', function(){                
                assert.strictEqual(streamer.name, 'deethree');
                assert.strictEqual(streamer.watchtime, '244422');
                assert.strictEqual(streamer.streamtime, '7003');
                assert.strictEqual(streamer.maxviewers, '422');
            });
            it('Test if user is invalid (Invalid Name)', async function(){
                let s = new Streamer('[deethr$$]', swatchtime, sstreamtime, smaxviewers);
                assert.strictEqual(await validation.validate_fields(s.name, s.watchtime, s.streamtime, s.maxviewers), false);
            });
            it('Test if user is invalid (Invalid Watch Time)', async function(){
                let s = new Streamer(sname, '2533-00', sstreamtime, smaxviewers);
                assert.strictEqual(await validation.validate_fields(s.name, s.watchtime, s.streamtime, s.maxviewers), false);
            });
            it('Test if user is invalid (Invalid Max View Count)', async function(){
                let s = new Streamer(sname, swatchtime, sstreamtime, '***93');
                assert.strictEqual(await validation.validate_fields(s.name, s.watchtime, s.streamtime, s.maxviewers), false);
            });
        });
    });
    describe('Test API calls', function(){
        describe('Streamers', async function(){            
            it('Fail 1. POST - Test invalid name in the object', async function(){
                let data = {
                    name: '__$t@r__', 
                    watchtime: '45667', 
                    streamtime: '2455', 
                    maxviewers: '124'
                }
                let res = await instance.post('/streamers', data);
                assert.strictEqual(res.data, 'Error. User not inserted in the database.');                
            });
            it('Fail 2. POST - Test invalid streamtime in the object', async function(){
                let data = { 
                            name: 'mfarhan', 
                            watchtime: '343280', 
                            streamtime: '42O0', 
                            maxviewers: '1280'
                        };
                let res = await instance.post('/streamers', data)
                assert.strictEqual(res.data, 'Error. User not inserted in the database.');                
            });
            it('Fail 3. POST - Test invalid numeric entries in the object', async function(){
                let data = { 
                    name: 'mfarhan', 
                    watchtime: '4340_1', 
                    streamtime: '0x2233', 
                    maxviewers: 'threefourthree'
                };
                let res = await instance.post('/streamers', data)
                assert.strictEqual(res.data, 'Error. User not inserted in the database.');                
            });
            it('Fail 4. GET - /streamers/:name (No user with name)', async function(){
                let user_name = 'unknown';
                let res = await instance.get('/streamers/'+user_name)
                assert.strictEqual(res.data,'No item was found');                  
            });
            it('Fail 5. DELETE - /streamers/:name (No user with name)', async function(){
                let user_name = 'unknown';
                let res = await instance.delete('/streamers/'+user_name);
                assert.strictEqual(res.data,'Streamer data was not found');
            });
            it('Fail 6. PUT - /streamers/:name (No user with name)', async function(){
                let data = { 
                    name: 'unknown', 
                    watchtime: '1223423', 
                    streamtime: '0x803f8001', 
                    maxviewers: '11010'
                };
                let res = await instance.put('/streamers/'+data.name, data);
                assert.strictEqual(res.data,'The new user data is not valid.');
            });
            it('Success 1. POST - Valid User, DELETE - User', async function(){
                let data = {
                    name: 'deethree', 
                    watchtime: '343343', 
                    streamtime: '2802', 
                    maxviewers: '1680'
                }
                let res_post = await instance.post('/streamers', data)
                assert.strictEqual(res_post.data, 'Streamer data correctly inserted in the Database.');
                let res_del = await instance.delete('/streamers/'+data.name);
                assert.strictEqual(res_del.data, 'Streamer data was deleted.');                
            });
            it('Success 2. POST - Valid User, GET - /streamers (Greater than 0), DELETE - User', async function(){
                let data = { 
                    name: 'deethree', 
                    watchtime: '347320', 
                    streamtime: '3351', 
                    maxviewers: '2212'
                };
                let res_post = await instance.post('/streamers', data)
                let res_get = await instance.get('/streamers')
                if (res_get.data.length < 1 ) {
                    assert.fail('There should be elements in the database');
                }
                let res_del = await instance.delete('/streamers/'+data.name);
                assert.strictEqual(res_del.data, 'Streamer data was deleted.');                
            });
            it('Success 3. POST - Valid User, GET - /streamers/:name, DELETE - User', async function(){
                let data = {
                    name: 'Wendigoon', 
                    watchtime: '55349281', 
                    streamtime: '23300', 
                    maxviewers: '18433'
                };
                let res_post = await instance.post('/streamers', data)
                let res_get = await instance.get('/streamers/'+data.name)
                assert.strictEqual(res_get.data.name, data.name);
                assert.strictEqual(res_get.data.watchtime, data.watchtime);
                assert.strictEqual(res_get.data.streamtime, data.streamtime);
                assert.strictEqual(res_get.data.maxviewers, data.maxviewers);
                let res_del = await instance.delete('/streamers/'+data.name);
                assert.strictEqual(res_del.data, 'Streamer data was deleted.');                
            });
            it('Success 4. POST - Valid User, UPDATE - :name, GET - /streamers/:name, DELETE - User', async function(){
                let data = {
                    name: 'exotic_butters', 
                    watchtime: '23320', 
                    streamtime: '754', 
                    maxviewers: '958'
                };
                let up_data = {
                    name: 'exotic_butters', 
                    watchtime: '663448', 
                    streamtime: '4223', 
                    maxviewers: '3022'
                };
                let res_post = await instance.post('/streamers', data)
                let res_put = await instance.put('/streamers/'+data.name, up_data);
                assert.strictEqual(res_put.data,'Streamer data correctly updated.');
                let res_get = await instance.get('/streamers/'+up_data.name)
                assert.strictEqual(res_get.data.name, up_data.name);
                assert.strictEqual(res_get.data.watchtime, up_data.watchtime);
                assert.strictEqual(res_get.data.streamtime, up_data.streamtime);
                assert.strictEqual(res_get.data.maxviewers, up_data.maxviewers);
                let res_del = await instance.delete('/streamers/'+up_data.name);
                assert.strictEqual(res_del.data, 'Streamer data was deleted.');                
            });            
        });        
    });
});
