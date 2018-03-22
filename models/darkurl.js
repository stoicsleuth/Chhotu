var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var CounterSchema = Schema({
//     id: {type: String, required: true},
//     seq: { type: Number, default: 0 }
// });

// var counterDark = mongoose.model('counterDark', CounterSchema);

// create a schema for our links
var urlSchemaDark = new Schema({
  id: {type: Number, index: true},
  long_url: String,
  created_at: Date,
  short_url: String,
  user: {

        type: mongoose.Schema.ObjectId,
        ref :'users'
  },
  click: 0
});

// urlSchemaDark.pre('save', function(next){
//   var doc = this;
//   counter.findOneAndUpdate({id: 'url_count'}, {$inc: {seq: 1} }, {new: true}, function(error, counter) {
//       if (error)
//           return next(error);
//       doc.created_at = new Date();
//       doc.id = counter.seq;
//       next();
//   });
// });

var urlDark = mongoose.model('urlDark', urlSchemaDark);

module.exports = urlDark;