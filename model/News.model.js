const mongoose = require('mongoose');


const NewsSchema = new mongoose.Schema({
   title: {
        type : String,
        required: [true, 'Please add News Title'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please add Award Title'],
        trim: true 
    },
    createdAt: {
        type:Date,
        default: Date.now
    }
})

NewsSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
  });

module.exports = mongoose.model('News', NewsSchema)