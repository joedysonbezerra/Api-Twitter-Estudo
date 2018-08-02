const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports ={
   async update(req,res,next){
      try {
         const id = req.userId
         const {name, username, password, confirmPassword} = req.body;
         if(password && password !== confirmPassword){
            return res.status(400).json({error:'Password doesn\'t match'});
         }
         const user = await User.findByIdAndUpdate(id,{ name, username},{new:true});
         // para poder passar pelo hook de salvar e criptografar a senha
         //pq o findById... não passar pelo hook de salvar
         if(password){
            user.password = password;
            await user.save();
         }

         return res.json(user);
      } catch (err) {
         return next(err);
      }
   }
}
