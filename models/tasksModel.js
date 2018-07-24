var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    "name" : {type: String},
    "description" : {type: String},
    "sprintNumber" : {type: String}, 
    "reportedBy" : {type: String},
    "suggestedBy" : {type: String}, 
    "notes" : {type: String},
    "assigned" : {type: Boolean, default: false}
});

module.exports = mongoose.model('Task', taskSchema, "task");  