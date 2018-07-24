var express = require('express');

var routes = function(Book) {      
    var bookRouter = express.Router();
    var bookController = require('../Controllers/bookController')(Book);

    bookRouter.route('/books')
        .get(bookController.get) 
        .post(bookController.post) 
        .put()
        .delete();

    //MIDDLEWARE - INTERCEPTOR BETWEEN REQUEST FROM CLIENT AND RESPONSE FROM SERVER
    bookRouter.use('/books/:bookId', function(request, response, next) {
        Book.findById(request.params.bookId, function(error, book) {
            if(error) {
                response.status(500).send(error)
            } else if(book) {
                request.book = book;
                next();
            }
            else {
                response.status(404).send("No Book Found")
            } 
        });
    });

    bookRouter.route('/books/:bookId')
    .get(function(request, response) {
        response.json(request.book);
    })
    .post() 
    .put(function(request, response) {
        request.book.author = request.body.author;
        request.book.title = request.body.title;
        request.book.genre = request.body.genre;
        request.book.read = request.body.read;
        request.book.save(function(err) {
            if(err) {
                response.status(500).send(error)
            } else {
                response.json(request.book);
            }
        }); 
    })
    .patch(function(request, response){
        if(request.body._id) {
            delete request.body._id
        }
        for(var i in request.body) {
            request.book[i] = request.body[i];
        }
        request.book.save(function(err) {
            if(err) {
                response.status(500).send(error)
            } else {
                response.json(request.book);
            }
        });
    })
    .delete(function(request, response) {
        request.book.remove(function(error) {
            if(error) {
                response.status(500).send(error);
            } else {
                response.status(204).send("Removed");
            }
        });
    });
    return bookRouter;
}
 
module.exports = routes;
