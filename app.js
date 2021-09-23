const mongoose= require('mongoose');
require('./models/Usuario');
require('./models/Mascota');
require('./models/Solicitud');
require('./config/passport')
const express = require('express');
const app = express();
const bodyParser=require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cdatabase connection

mongoose.connect('mongodb+srv://ivanDK5:Esteta10@cluster0.f8vdq.mongodb.net/adoptapet?retryWrites=true&w=majority');
mongoose.set('debug',true);


app.use('/v1/',require('./routes'));

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});