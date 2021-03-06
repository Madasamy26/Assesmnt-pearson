const express = require('express');
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
var ObjectID = require('mongodb').ObjectID;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


MongoClient.connect('mongodb://maddy:maddy123@ds153552.mlab.com:53552/calendar', { useNewUrlParser: true }, (err, db) => {
var dbase = db.db("calendar");
    if (err) return console.log(err)
    app.listen(4000, () => {
        console.log('app working on 4000')
    })

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
      });

    app.get('/', function (req, res) {
        res.send("Calendar is working");
    });
    
    app.post('/event/add', (req, res, next) => {
    
        var event = {
            createdDate: req.body.createdDate,
            createdTime: req.body.createdTime,
            eventDate: req.body.eventDate,
            eventTime: req.body.eventTime,
            eventName: req.body.eventName,
            eventDesc: req.body.eventDesc,
        };
    
        dbase.collection("event").save(event, (err, result) => {
            if (err) {
                console.log(err);
                res.status(400);
            }
            res.status(200);
            res.send('name added successfully');
        });
    });
    
    app.get('/events', (req, res, next) => {
        dbase.collection('event').find().toArray((err, results) => {
            res.send(results)
        });
    });
    
    app.put('/event/update/:id', (req, res, next) => {
        var id = {
          _id: new ObjectID(req.params.id)
        };
    
        dbase.collection("event").update(id,
             {$set:{
                 createdDate: req.body.createdDate,
                 createdTime: req.body.createdDate,
                 eventDate: req.body.createdDate,
                 eventTime: req.body.createdDate,
                 eventName: req.body.createdDate,
                 createdDate: req.body.createdDate,
                 eventDesc: req.body.createdDate,
                
                
                }}, (err, result) => {
          if(err) {
            throw err;
          }
    
          res.send('user updated sucessfully');
        });
      });
    
    app.delete('/event/delete/:id', (req, res, next) => {
        let _id = ObjectID(req.params.id);
    
        dbase.collection('event').deleteOne({ _id }, (err, result) => {
            if (err) {
                throw err;
            }
    
            res.send('user deleted');
        });
    }); 
    
  })






