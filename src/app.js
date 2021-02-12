const express = require('express')
const app = express()
const path = require('path');
const Register = require('./models/register');
require('./db/conn')
// console.log('path',__dirname,'../view')
// const mongoose = require('mongoose');
app.use(express.json());
app.use(express.urlencoded({extended:false}))



app.set('view engine','hbs');

const static_path = path.join(__dirname,'../public');
app.use(express.static(static_path))
app.set('view engine', "hbs");
app.get('/',(req,res)=>{
    res.render("index")
}); 
 

app.get('/register',(req,res)=>{

    res.render("register")
});


app.get('/user',(req,res)=>{
    //get all user list
});


app.post('/login',async(req,res)=>{
    try {
        const user = req.body.name;
        const role = req.body.isuser;
        console.log('user...',user);

       const uservalid = await Register.findOne({role:role,name:user})        
       console.log('uservali',uservalid.role);
       if(uservalid && uservalid.role == 'user'){
           const memberData = await Register.find({role:'member'})        
           res.render('memberlist',{users:memberData});
       }else{
           res.send('User not Admin....');
       }
       
    } catch (error) {
        res.status(400).send('Invalud user')
    }
    // if(userNotfound){
    //     res.status(202).send('user Not found')
    // }else{
    //     res.send("Sucess")
    // }
});



app.post('/register',async(req,res)=>{
    // console.log(req.body.name)
    // console.log(req.body.experiance);
    // console.log(req.body.joindate);
    console.log(req.body.isuser);
    try {
        let tempdate;
        if(req.body.isuser == 'member'){
            tempdate = Date.now();
        }else{
            tempdate = ''
        }
        const userRegiter = new Register({
            name : req.body.name,
            experiance: req.body.experiance,
            role : req.body.isuser,
            joindate : req.body.joindate,
            membersubcription : [
            subscriptionstartdate=tempdate,
            subscriptionendate=tempdate,
            subscriptionamount=tempdate,
            ]
        })
        console.log(userRegiter);
        const register = await userRegiter.save();
        // res.render("register")
        res.status(201).render('index');
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});



app.listen(3000);