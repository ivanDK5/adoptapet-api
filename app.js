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

mongoose.connect(process.env.MONGODB_URI);
mongoose.set('debug',true);


app.use('/v1/',require('./routes'));

const PORT = 4001;
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});