const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
   content:{
      type: String,
      required:true,
      trim: true, // remove espaços antes e depois do contéudo
      maxlength: 200,
   },
   user:{
      type:mongoose.Schema.ObjectId,
      ref:'User',
      require: true,
   },
   likes:[{type:mongoose.Schema.ObjectId, ref:'User'}],
   createAt:{
      type:Date,
      default:Date.now,
   }
});

mongoose.model('Tweet', TweetSchema);
