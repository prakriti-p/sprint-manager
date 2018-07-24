var request = require('supertest');
var should = require('should');
var mongoose = require('mongoose');
var Book = require('../models/bookModel'); 
//var Book = mongoose.model('Book'); 
var app = ('../app');
var agent = request.agent(app); 

describe("Integration Tests", function() {
    it("Should allow a book to be posted and return id and read", function() {
        var bookPost = {
            author: "Prakriti Patra",
            title: "Known Faces",
            genre: "Comedy"
        };
        agent.post("/api/books")
        .send(bookPost)
        .expect(200)
        .end(function(err, results) {
            if(err) {
                console.log(">>>>>>", err);
            } else {
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done();
            }
            
        })
    });

    afterEach(function(done) {
        //Book.remove.exec();
        done();
    })
});