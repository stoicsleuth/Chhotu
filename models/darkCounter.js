var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CounterSchemaDark = Schema({
    id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var counterDark = mongoose.model('counterDark', CounterSchemaDark);

module.exports = counterDark;

