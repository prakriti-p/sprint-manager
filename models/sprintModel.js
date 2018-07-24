var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sprintSchema = new Schema({
    "_id" : {type: Number}, 
    "name" : {type: String},
    "fromDate" : {type: String},
    "toDate" : {type: String},
    "releaseDate" : {type: String},
    "merge1Date" : {type: String},
    "merge2Date" : {type: String},
});

module.exports = mongoose.model('Sprint', sprintSchema, "sprint");  