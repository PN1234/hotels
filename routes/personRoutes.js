const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const {jwtAuthMiddleware,generateToken} = require('./../jwt');


router.post('/signup',async function(req,res){
   try{
      const data = req.body;
      const newperson = new Person(data);
      const savedperson = await newperson.save();
      console.log("data saved");
      console.log(newperson);
      console.log(savedperson);

      const payload = {
        id:savedperson.id,
        username:savedperson.username
      }
      console.log(JSON.stringify(payload));

      const token = generateToken(payload);
      console.log("Token is:",token);

      res.status(200).json({savedperson:savedperson,token:token});
      
   }
   catch(error){
   console.log(error);
   res.status(500).json({error:'Internal server error'});
   }
})
//Login route

router.post('/login',async (req,res) => {
     
     try
     {
     const {username,password} = req.body;
     
        const user = await Person.findOne({username:username});

        if(!user || !await user.comparePassword(password)){
             return res.status(401).json({error:"Invalid Username or password"});
          }
          //generate token
          const payload = {
            id:user.id,
            username:user.username
          }
          const token = generateToken(payload);
      res.json({token});
      }
      
catch(error){
    console.log(error);
    res.status(500).json({error:error});
}

     
})

router.get('/profile',jwtAuthMiddleware,async (req,res) => {
    try{
        const userData = req.user;
        const userid = userData.id;
        const user = await Person.findById(userid);
        res.status(200).json({user});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
})

router.get('',async function(req,res){
    try{
      const data = await Person.find();
      //const result = data.filter((val) => val.work == "waiter")
      res.send(data);
   }
   catch(error) {
     console.log(error)
}
})

router.get('/:worktype',async function(req,res){
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
})


router.put('/:id',async function(req,res){
  try{
  	const personid = req.params.id;
    const updatedpersondata = req.body;
    const response = await Person.findByIdAndUpdate(personid,updatedpersondata,{
      new:true,
      runValidators:true,
    })
    if(!response){
    	res.status(404).json({error:"No Such Person Found "})
    }
 
        res.status(200).json(response);
        console.log("Data Updated Successfully");
  
}
catch(error) {
res.status(500).json({error:"Internal Server Error"});
}
})

router.delete('/:id',async function(req,res){
	try{
		const deleteid = req.params.id;
		const deletedata = await Person.findByIdAndDelete(deleteid);
		if(!deletedata){
		res.status(404).json({error:"No Such Person Found "})
       }
        console.log("data delete");
      res.status(200).json({message:"Data Deleted"});
       }
    catch(error) {
    	console.log(error);
res.status(500).json({error:"Internal Server Error"});
}
})

module.exports = router;