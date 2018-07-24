var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    name : {type: String},
    role : {type: String},
    emailId : {type: String}
});

module.exports = mongoose.model('Team', teamSchema, "team");  