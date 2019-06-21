var express = require('express');
var mongodb = require('mongodb').MongoClient;


var rejectRouter = express.Router();
var u_router = function(web3) {
    rejectRouter.route("/")
        .post(function(req, res) {
            const url = 'mongodb://localhost:27017';
            mongodb.connect(url, { useNewUrlParser: true }, function(err, client) {
                console.log("Successfully connected to database.");

                const db = client.db('NodeDemoWebApp');
                const Users = db.collection('Users');
                const Requests = db.collection('ReviewerRequests');

                Users.updateOne({ address: req.body.data}, { $set: { type: 0 } }, function(err, result) {
                    if (err == undefined) {
                        console.log("Rejected Request successfully!!");


                    } else {
                        console.log(err);
                    }
                });

                Requests.deleteOne({ address: req.body.data}, function(err, result) {
                    if (err == undefined) {
                        console.log("Deleted Request successfully!!");


                    } else {
                        console.log(err);
                    }
                });
            });
            res.send("Request Rejected");
        });
        
    return rejectRouter;
}
module.exports = u_router;