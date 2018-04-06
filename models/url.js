var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CounterSchema = Schema({
    id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var counter = mongoose.model('counter', CounterSchema);

// create a schema for our links
var urlSchema = new Schema({
  id: {type: Number, index: true},
  long_url: String,
  created_at: Date,
  user: {

        type: mongoose.Schema.ObjectId,
        ref :'users'
  },
  click: 0,
  useragent : {
      windows: { type: Number, default: 0 },
      mac : { type: Number, default: 0 },
      android:{ type: Number, default: 0 },
      iOs: { type: Number, default: 0 }
  },
  browser : {
    chrome: { type: Number, default: 0 },
    safari : { type: Number, default: 0 },
    firefox:{ type: Number, default: 0 },
    ie: { type: Number, default: 0 }
  }
});

urlSchema.pre('save', function(next){
  var doc = this;
  counter.findOneAndUpdate({id: 'url_count'}, {$inc: {seq: 1} }, {new: true}, function(error, counter) {
      if (error)
          return next(error);
      doc.created_at = new Date();
      doc.id = counter.seq;
      next();
  });
});

var url = mongoose.model('url', urlSchema);

module.exports = url;