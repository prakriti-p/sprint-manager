 var should = require('should');
 var sinon = require('sinon');

 describe('Book Controller Tests', function() {
    describe('Title cannot be empty', function() {
        
        var Book = function(book) {
            this.save = function() {
            }
        }

        var request = {
            body: {
                author: 'Jon'
            }
        }

        var response = {
            status: sinon.spy(),
            send: sinon.spy()
        }

        var bookController = require('../Controllers/bookController')(Book);

        bookController.post(request, response);

        response.status.calledWith(400).should.equal(true, 'Bad Status ', response.status.args[0][0]);
        response.send.calledWith('Title is required').should.equal(true);

    });
 });