const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const diveSchema = new Schema({
    diveSite: {
        type: String,
        required: 'You need a dive site!',
        minlength: 1,
        trim: true,
    },
    diveText: {
        type: String,
        // required: 'You need to leave a dive description!',
        // minlength: 1,
        trim: true,
    },
    diveAuthor: {
        type: String,
        required: true,
        trim: true,
    },
    diveBuddy: {
        type: String,
        // required: 'You need a Buddy!',
        // minlength: 1,
        trim: true,
    },
    diveLife: {
        type: String,
        // minlength: 1,
        trim: true,
    },
    // diveImage: {
    //     type: String,
    // },
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
                type: String,
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
