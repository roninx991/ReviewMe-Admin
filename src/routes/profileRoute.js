var express = require('express');
var mongodb = require('mongodb').MongoClient;
var profileRouter = express.Router();
var path = require('path');



var p_router = function() {
    profileRouter.route("/")
        .all(function(req, res, next) {
            if (!req.user) {
                res.redirect('/');
            } else {
                const url = 'mongodb://localhost:27017';
                var list = new Array();

                mongodb.connect(url, { useNewUrlParser: true }, function(err, client) {
                    const db = client.db("NodeDemoWebApp");
                    const Requests = db.collection("ReviewerRequests");

                    Requests.find().toArray(function(err, requests) {
                        for(var i=0; i<requests.length; i++)
                        {
                            list.push(requests[i]);
                        }

                        res.render('profile', {
                            title: "cPanel",
                            user: req.user,
                            r: list
                        });

                    
                    });


                });
            }
        });

    return profileRouter;
}
module.exports = p_router;