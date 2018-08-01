var express = require('express');

var routes = function(Team) {      
    var teamRouter = express.Router();
    var teamController = require('../Controllers/teamController')(Team);

    teamRouter.route('/team')
        .get(teamController.get) 
        .post(teamController.post) 
        .put()
        .delete();

    //MIDDLEWARE - INTERCEPTOR BETWEEN REQUEST FROM CLIENT AND RESPONSE FROM SERVER
    teamRouter.use('/team/:teamId', function(request, response, next) {
        Team.findById(request.params.teamId, function(error, member) {
            if(error) {
                response.status(500).send(error)
            } else if(member) {
                request.member = member;
                next();
            }
            else {
                response.status(404).send("No Member Found")
            } 
        });
    });

    teamRouter.route('/team/:teamId')
        .get(function(request, response) {
            response.json(request.member);
        })
        .post() 
        .put(function(request, response) {
            
        })
        .patch(function(request, response){
            
        })
        .delete(function(request, response) {
            
        });
    return teamRouter;
}
 
module.exports = routes;
