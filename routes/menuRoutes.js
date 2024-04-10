const express = require('express');
const router  = express.Router();
const MenuItem = require('./../models/MenuItem');

router.post('/',async function(req,res){

try{
  const menuinfo = req.body;
  const Menudata = new MenuItem(menuinfo);
  const savedMenuItem = await Menudata.save(); 
  res.status(200).json(Menudata);
  }
catch(error){
console.log(error);
res.status(500).json({error:'Internal server error'});
}
})

router.get('/', async function(req,res){
  try{
   const data = await MenuItem.find();
   res.status(200).json(data);
  }
  catch(error){
    res.status(500).json({error:"Internal Server Error"})
  }
})

router.get('/:tastetype', async function(req,res){
try{
  const tastefood = req.params.tastetype;
  const tastedata = await MenuItem.find({taste:tastefood});
  if(tastefood == 'sour' || tastefood == 'sweet' || tastefood == 'spicy'){
    res.status(500).json(tastedata);
  }
  else{
    res.status(404).json({error:"data not found"})
  }
}
catch(error){
  res.status(500).json({error:"Internal Server Error"});
}
})

router.put('/:id',async function(req,res){
  try{
    const updateid = req.params.id
    const updatedmenuitem = req.body
    const response = await MenuItem.findByIdAndUpdate(updateid,updatedmenuitem,{
      new:true,
      runValidators:true
    })
    if(!response){
      res.status(404).json({message:"NO such person found"})
    }
    res.status(200).json({message:"Menuitem updated"})
  }
  catch(error){
    console.log(error);
    res.status(500).json({error:"Internal Server Error"})
  }
})

router.delete('/:id',async function(req,res){
 try 
 { 
   const deleteid = req.params.id;
   const response = await MenuItem.findByIdAndDelete(deleteid)
   if(!response){
    res.status(404).json({error:"No Such MenuItem Found"})
   }
   res.status(200).json({message:"Menuitem Deleted"})
 }
 catch(error){
  console.log(error);
  res.status(500).json({error:"Internal Server Error"})
 }
})

module.exports = router;