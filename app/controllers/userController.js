var user = require('../models/userModel.js');
var async = require('async');

// app/router.js
module.exports = function (app, express) {
    
    var apiRoutes = express.Router(); 

    apiRoutes.get("/users", function(req, res, next){

        var page;
        if(req.query.page) page = req.query.page;
        else page = 1;

        var PAGE_LIMIT;
        if(req.query.pageLimit) PAGE_LIMIT = req.query.pageLimit;
        else PAGE_LIMIT = 10;

         var countQuery = function(callback){
            user.find({}, function(err, doc){
                if(err) callback(err, null); 
                else callback(null, doc.length);
            });
        };

        var retrieveQuery = function(callback){
            user.find({}).skip(parseInt((page-1)*PAGE_LIMIT)).limit(parseInt(PAGE_LIMIT)).exec(function(err, doc){
                                    if(err)callback(err, null) 
                                    else callback(null, doc); 
            });
        }


        async.parallel([countQuery, retrieveQuery], function(err, results){
            res.json({users: results[1], pageLimit: PAGE_LIMIT, page: page, totalCount: results[0]});
        });
        

    });

    // route to return user (GET http://localhost:8181/api/user)
    apiRoutes.get("/user", function(req, res, next) {
        user.findById({_id : req.query.id}, function(err, user){
             res.json(user)
        })

    });

  
    app.use('/api', apiRoutes);


 
}