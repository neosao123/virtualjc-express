const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'supervisor', 'serviceadvisor'],
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    IP: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    profilePath: {
        type: String
    },
    higherAutherity: {
        type: Schema.Types.ObjectId
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);