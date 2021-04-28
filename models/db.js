const mongodb = require('mongodb'); 
const dotenv = require('dotenv'); 

dotenv.config(); 
const client = mongodb.MongoClient; //connect to database
const url = process.env.DB_URL; // get url of local database installed
const options = {useUnifiedTopology: true}; 

const database = { // declare js object w multiple function/method
    insertOne: function(collection, doc){
        client.connect(url, options, function(err,db){
            if(err) throw err; //if error show, else show conenction
            var database = db.db('database'); //name of db
            database.collection(collection).insertOne(doc, function(err, res){ //go tot his colelction in the db
                if(err) throw err; 
                console.log('1 document insered'); //insert json obj to this db
                db.close(); 
            }); 
        }); 
    }, 

    insertMany: function(collection, docs){
        client.connect(url, options, function(err,db){
            if(err) throw err; //if error show, else show conenction
            var database = db.db('database'); //name of db
            database.collection(collection).insertMany(doc, function(err, res){ //go tot his colelction in the db
                if(err) throw err; 
                console.log('Documents inserted: ' + res.insertedCount); //insert json obj to this db
                db.close(); 
            }); 
        }); 

    }, 

    findOne: function(collection, query, callback){
        client.connect(url, options, function(err, db){
            if (err) throw err; 
            var database = db.db('database'); 
            database.collection(collection).findOne(query, function(err, result){
                if (err) throw err; 
                res = result; 
                db.close(); 
                return callback(result); 
            }); 
        }); 
    }, 

    findMany: function(collection, query, sort=null, projection=null){
        client.connect(url, options, function(err, db){
            if (err) throw err; 
            var database = db.db('database'); 
            database.collection(collection).find(query, {projection: projection}).sort(sort).toArray(function(err, result){
                if (err) throw err; 
                console.log(result); 
                db.close(); 
            });
        }); 
    }, 

    deleteOne: function(collection, filter){
        client.connect(url, options, function(err, db){
            if(err) throw err; 
            var database = db.db('database'); 
            database.collection(collection).deleteOne(filter, function(err, res){
                if(err) throw err; 
                console.log('1 document deleted'); 
                db.close(); 
            });
        }); 
    },

    deleteMany: function(collection, filter){
        client.connect(url, options, function(err, db){
            if(err) throw err; 
            var database = db.db('database'); 
            database.collection(collection).deleteMany(filter, function(err, res){
                if(err) throw err; 
                console.log('Documents deleted: ' + res.deletedCount); 
                db.close(); 
            });
        }); 
    },

    updateOne: function(collection, filter){
        client.connect(url, options, function(err, db){
            if(err) throw err; 
            var database = db.db('database'); 
            database.collection(collection).updateOne(filter, updated, function(err, res){
                if(err) throw err; 
                console.log('1 document updated'); 
                db.close(); 
            });
        }); 
    },

    updateMany: function(collection, filter){
        client.connect(url, options, function(err, db){
            if(err) throw err; 
            var database = db.db('database'); 
            database.collection(collection).updateMany(filter, updated, function(err, res){
                if(err) throw err; 
                console.log('Documents updated: ' + res.updated);  
                db.close(); 
            });
        }); 
    }
}; 

module.exports = database; 