const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

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
//Temos que usar um function em vez de uma arroy function porque precisamos do this.
UserSchema.pre('save', async function hashPassword(next){
   if(!this.isModified('password')) next();

   this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods ={
   compareHash(password) {
      return bcrypt.compare(password, this.password);
   },
   generateToken(){
      return jwt.sign(
         {id: this.id},
         authConfig.secret,
         {expiresIn: 86400}
      );
   },
}

mongoose.model('User', UserSchema);
