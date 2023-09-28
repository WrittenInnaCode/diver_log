const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const diveSchema = new Schema({
    diveSite: {
        type: String,
        required: 'You need to enter a dive site!',
        minlength: 1,
        trim: true,
    },
    diveDate: {
        type: String,
        required: 'You need to enter the date of the dive!',
    },
    timeIn: {
        type: String,
        required: 'You need to enter the time when the dive started!',
    },
    timeOut: {
        type: String,
        required: 'You need to enter the time when the dive ended!',
    },
    startPsi: {
        type: String,
        required: 'You need to enter tank PSI at the beginning of the dive!',
        minlength: 1,
    },
    endPsi: {
        type: String,
        required: 'You need to enter tank PSI at the end of the dive!',
        minlength: 1,
    },
    diveText: {
        type: String,
        // required: 'You need to leave a dive description!',
        // minlength: 1,
        trim: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    diveBuddy: {
        type: String,
        trim: true,
    },
    diveLife: {
        type: String,
        trim: true,
    },
    temperature: {
        type: String,
        trim: true,
    },
    visibility: {
        type: String,
        trim: true,
    },
    current: {
        type: String,
        trim: true,
    },
    maxDepth: {
        type: String,
        trim: true,
    },
    weights: {
        type: String,
        trim: true,
    },
    rating: {
        type: Number, // Use Number type to store the rating as an integer
        // required: 'Give this dive a star rating!',
        // min: 1, 
        // max: 5, 
    },
    divePhoto: [
        {
            type: String,
        },
    ],

    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    comments: [
        {
            commentText: {
                type: String,
                required: true,
                minlength: 1,
            },
            commentAuthor: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
            },
        },
    ],
});

const Dive = model('Dive', diveSchema);

module.exports = Dive;
