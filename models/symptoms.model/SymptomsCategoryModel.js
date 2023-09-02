const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SymptomsCategorySchema = new Schema({
    SymptomsCategoryName: {
        type: String
    },
    isActive: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('SymptomsCategory', SymptomsCategorySchema);