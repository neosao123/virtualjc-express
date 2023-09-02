const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    method: { type: String, required: true },
    url: { type: String, required: true },
    headers: { type: Object },
    timestamp: { type: Date, required: true }
}, {
    timestamps: true
}
);
module.exports = mongoose.model('Log', logSchema);