const express= require('express');
const app= express();
const path = require('path');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'));
const request = require('request');
const { query } = require('express');



app.get('/search',(req,res)=>{
    res.render('search');
})
app.get('/results',(req,res)=>{
    
    let query= req.query.search;
    request('https://api.themoviedb.org/3/search/movie?api_key=a2ea1f812764dd2747732ba9dddf2da4&query='+query,(error,response,body)=>{
        if(error){
            console.log(error);
        }
        let data = JSON.parse(body);
        res.render('movie',{data:data, searchQuery:query});
    });
   
})
app.listen(3000,()=>{
    console.log('Server started at port 3000');
})