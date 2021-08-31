const express = require('express');
const app = express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
const gods = {
  Zeus: { live: 'Olympus', symbol: 'Thunderbolt' }, 
  Hades : { live : 'Underworld', symbol: 'Cornucopia' } 
};

const constelaciones={
    Andromeda : {
    abreviatura : 'And',
    superficie :  722.3,
    num_estrellas : 152,
    estr_mas_brillante : 'Alpheratz' 
  },
  Aquila : {
    abreviatura : 'Aql',
    superficie :  652.5,
    num_estrellas : 124,
    estr_mas_brillante : 'Altair' 
  },
  ElCanMayor : {
    abreviatura : 'CMa',
    superficie :  380.1,
    num_estrellas : 147,
    estr_mas_brillante : 'Sirio' 
  }
}
app.get('/gods', (req, res, next) => {
  res.send(gods);
});

app.get('/constelaciones',(req, res, next) => {
  res.send(constelaciones);
})

app.get('/gods/:name',(req,res)=>{
  let good=gods[req.params.name];
  if(good){
    res.send(good)
  }else{
    res.status(404).send('No encontre el dios')
  }
  
})

app.get('/constelaciones',(req,res)=>{
  let constelacion =req.params.name;
  if(req.query.name)
  res.send(req.query.name)
})

app.put('/gods/:name',()=>{
  var god =req.params.name;
  gods[god] =req.body;
  res.send(gods);

})

app.post('/gods',(req,res)=>{
  let name=req.query.name;
  let info=req.body;
  gods[name]=info;
  res.status(200).send(gods)
})

app.delete('/gods/:name',(req,res)=>{
  let name = req.params.name;
  delete gods[name];
  res.send(gods);
})