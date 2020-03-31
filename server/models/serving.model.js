const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const servingSchema = new Schema({
    fdc_id: {type: String, required: true},
    serving_size: { type: String, required: true }
}, {
    timestamps: true,
});

const Serving = mongoose.model('Servings', servingSchema);

module.exports = Serving;