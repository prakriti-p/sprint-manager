var teamController = function(Team) {

    var post = function(request, response) {
        var team = new Team(request.body);

        if(!request.body.name) {
            response.status(400);
            response.send("Name is required");
        } else {
            team.save();
            response.status(201);
            response.send(team);
        }        
    };
    var get = function(request, response) {
        var query = {};
        if(request.query.role) {
            //query.role = request.query.role;
        }
        Team.find(query, function(error, team) {
            if(error) {
                response.status(500);
                response.send(error);
            } else {
                response.json(team);
            }
        });
    }

    return {
        post: post,
        get: get
    }

}

module.exports = teamController;