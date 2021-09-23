const passport = require('passport');
const localStrategy= require('passport').Strategy;
const moongose= require('mongoose');
const Usuario=moongose.model('Usuario');

passport.use('local',new localStrategy({
  usernameField:'email',
  passwordField:'password'
},function (email,password,next){
  Usuario.findOne({email:email})
  .then(function(user){
    if(!user||!user.validarPassword(password)){
    return next(null,false,{error:{'email o contraseña incorrecta':'equivocado'}});
  }
  return next(null,user)
})
  .catch(next)
}))

