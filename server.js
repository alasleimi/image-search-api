
const express = require("express");
const app = express();
const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;
const GoogleImages = require('google-images');

const client = new GoogleImages(process.env.CSEID, process.env.APIKEY);

var db;
 

MongoClient.connect(process.env.DBURL,(err,client)=>{

    if(err){
        console.log(err);
    }else{

      db = client.db("searchhistory");
      

    }

});

app.get("/search/:term",(req,res)=>{
    
     
    if(req.query.offset && isNaN(req.query.offset)){

        res.status(400).end();
    }else{

     
      
      db.collection("history").insert({"term": req.params.term, 
      "when": new Date().toISOString() });
    
       
    client.search(req.params.term,{page: req.query.offset?req.query.offset:1 })
	.then(images => {
        
        
        res.status(200).end(
               JSON.stringify(images.map(a => {return {url:a.url,
                                        snippet:a.description,
                                        thumbnail:a.thumbnail.url,
                                        context:a.parentPage}}))
        )
    
    
    })
   
    }


})

app.get("/history",(req,res)=>{

   

    db.collection("history").find().sort({_id:-1}).project({_id:0}).toArray((err,result)=>{

        if(err) console.log(err);
        else{
            res.status(200).end(JSON.stringify(result));
        }
    })


})

app.listen(process.env.PORT);