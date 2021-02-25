const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title can't be null"],
        tirm:true,
        unique:true,
    },
    coverPhoto:{
        type:String,
    },
    description:{
        type:String,
    }
});

const Tour = mongoose.model('Tour',tourSchema);
module.exports = Tour;