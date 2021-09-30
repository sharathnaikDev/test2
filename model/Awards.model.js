const mongoose = require('mongoose');


const AwardsSchema = new mongoose.Schema({
    awardTitle: {
        type : String,
        required: [true, 'Please add Award Title'],
        unique: true,
        trim: true,
        maxlenght: [100, 'Award Title can not be more that 100 characters'] 
    },
    slug: String,
    winnerName: {
        type: String,
        required: [true, 'Please add Award Title'],
        trim: true,
        maxlenght: [100, 'Winner Name can not be more that 100 characters'] 
    },
    year: {
        type: Number,
        
    },
    createdAt: {
        type:Date,
        default: Date.now
    }
})

AwardsSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('Awards', AwardsSchema)