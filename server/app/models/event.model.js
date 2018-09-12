const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    
        id: Number,
        createdDate: String,
        createdTime: String,
        eventDate: String,
        eventTime: String,
        eventName: String,
        eventDesc: String
        
        

});

module.exports = mongoose.model('Event', EventSchema);