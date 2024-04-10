const express = require('express');
const bodyparser = require('body-parser');
const Menu = require('./models/MenuItem');
const Person = require('./models/person'); 
const app = express();
const db = require('./db');
require('dotenv').config();
app.use(bodyparser.json())

app.get('/',function(req,res){
   res.send("Welcome to my hotel...How i can help you..")
   console.log(res.status().json());
})

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu',menuRoutes);

const PORT = process.env.PORT || 3000;
/*app.post('/person',async function(req,res){
   try{
      const data = req.body;
      const newperson = new Person(data);
      const savedperson = await newperson.save();
      const output = res.status(200).json(newperson);
   }
   catch(error){
   console.log(error);
   res.status(500).json({error:'Internal server error'});
   }
})

app.get('/person', async function(req,res){
    try{
      const data = await Person.find();
      //const result = data.filter((val) => val.work == "waiter")
      res.send(data);
   }
   catch(error) {
     console.log(error)
}
})

app.get('perosn/:worktype',async function(req,res){
try{
    const para = req.params;
    console.log(para);
const worktype = req.params.worktype;
console.log(worktype);
if(worktype == 'chef' || worktype == 'waiter' || worktype == 'manager')
{
const data = await Person.find({work:worktype})
res.status(200).json(data);
}
else{
    res.status(404).json({error:"invalid work type"});
}
}
catch(error){
    res.status(500).json({error:"Internal Server Error"});
} 
})*/



app.listen(3000,function() {
   console.log("Server Started...listening on port 3000...");
})