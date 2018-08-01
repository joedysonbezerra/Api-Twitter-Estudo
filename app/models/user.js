const mongoose = require('mongoose');

//Como se fosse uma tabela no msqyl--schema
const UserSchema = new mongoose.Schema({
   name:{
      type: String,
      required:true,
   },
   username:{
      type:String,
      required:true,
      unique:true,
   },
   email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
   },
   password:{
      type:String,
      required:true,
   },
   followers:[{type: mongoose.Schema.ObjectId, ref:'User'}],
   following:[{type: mongoose.Schema.ObjectId, ref:'User'}],
   createAt:{
      type:Date,
      default:Date.now,
   }
});

mongoose.model('User', UserSchema);
