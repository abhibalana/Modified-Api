const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { json } = require("express/lib/response");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
var array=[];

app.get("/todos",function(req,res){
    const url ="https://jsonplaceholder.typicode.com/todos"
    https.get(url,function(response){
        let data="";
       response.on("data",function(chunk){
           data+=chunk;
       })
       response.on("end",function(){
        const jsonArray = JSON.parse(data);
     for(i=0;i<jsonArray.length;i++){
         delete jsonArray[i].userId;
     }
     res.send(jsonArray);
       })
    })

});

app.get("/users/:id",function(req,res){
    const id = req.params.id;
    const url ="https://jsonplaceholder.typicode.com/users/"+id;
    https.get(url,function(response){
        let data ="";
        response.on("data",function(chunk){
        data+=chunk;
        })
        response.on("end",function(){
            const d = JSON.parse(data);
            const url ="https://jsonplaceholder.typicode.com/todos"
    https.get(url,function(responses){
        let data1="";
       responses.on("data",function(chunk){
           data1+=chunk;
       })
       responses.on("end",function(){
        const jsonArray = JSON.parse(data1);
     for(i=0;i<jsonArray.length;i++){
         if(id==jsonArray[i].userId){
             array.push(jsonArray[i]);
         }
     }
    
            d.todos=array;
            res.send(d);

        })
    })
});
    });
});



        
app.listen(3000,function(){
    console.log("server started");
});
