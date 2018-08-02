const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
   async signin(req,res,next){
      try {
         const {email,password} = req.body;

         const user = await User.findOne({ email });

         if(!user){
            return res.status(400).json({error:'User not found'});
         }

         if(!await user.compareHash(password)){
            return res.status(400).json({error: 'Invalid password'});
         }

         return res.json({
            user,
            token: user.generateToken(),
         });
      } catch (err) {
         return next(err);
      }
   },
//Criando usuário no banco de dados
   async signup(req,res,next){
      try {
         const {username, email} = req.body;
   //Procurando se já existe 1 email e username no banco de dados
         if(await User.findOne({$or:[{ email },{ username }]})){
            return res.status(400).json({error:'User already exists'});
         }

         const user = await User.create(req.body);

         return res.json({
            user,
            token: user.generateToken(),
         });
      } catch (err) {
         return next(err);
      }
   }
}
