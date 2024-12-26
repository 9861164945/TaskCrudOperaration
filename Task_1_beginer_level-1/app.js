// Server Setup
const express= require('express');
const app=express();
const port=3000;
const formData = []; //For Temporaray Storage

//Ejs Setting
app.set('view engine','ejs');
app.use(express.static('public'));//This line allows Express to serve static files (like images, stylesheets, and scripts) from the public directory.
//middleware to parse data
app.use(express.urlencoded({extended:true}));
// Router Handling 
/*  '/' means By default home page it renders to the form*/
app.get('/',(req,res)=>
 {
   res.render('Form');
});
/*
After clicking on submit butto it redirect to the page Contains All the Input what Are putted by the user  
*/
app.post('/submit',(req,res)=>{
   const{name,email,password}=req.body;

   if(!name || !email || !password){
     return res.status(400).send('All Fields Are required!');
   }
   //Email server side Validation
   const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;// Latest Email Pattern according to google;
   if (!email.match(emailPattern)) 
   {
     return res.status(400).send('Please enter a valid email address');
   }

   if(password.length<6){
     return res.status(400).send('Password Must be Contain 6 character/Number');
   }
  formData.push({ name, email, password });//For Tenmporary Storage we will need the form data

   res.render('AfterSubmit',{name,email,password});
});
//Starting the Server
app.listen(port,()=>{
   console.log(`Server is Running at port :${port}`);
})