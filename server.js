const express = require("express");
const cors = require("cors");
const {MongoClient} = require("mongodb");

const app = express();

app.use(cors());

app.use(express.json());

const client = new MongoClient("mongodb+srv://dheepakane:dheepakane@mern.78rw6.mongodb.net/?retryWrites=true&w=majority&appName=mern");


//get request

app.get("/customers" , async (req,res)=>{
    await client.connect();
    const x = await client.db("mern_db").collection("customers").find().toArray();
    res.json(x);
})

//post request

app.post("/insert" , async(req,res)=>{
    await client.connect();
    const y = await client.db("mern_db").collection("customers").insertOne({"first_name":req.body.first_name,
        "last_name":req.body.last_name,
        "street_address":req.body.street_address,
        "street_address_line":req.body.street_address_line,
        "city":req.body.city,
        "state":req.body.state,
        "zip_code":req.body.zip_code,
        "number":req.body.number,
        "email":req.body.email,
        "aadhaar":req.body.aadhaar
    });
    const {acknowledged} = y;
    if(acknowledged){
        res.json({"msg":"customer record saved success..!"})}
    else{
        res.json({"msg":"customer record not saved....!"});}
})

//put request

app.put("/update",async (req,res)=>{
    await client.connect();
    const z = await client.db("mern_db").collection("customers").updateOne({"first_name":req.body.first_name},{$set:{"last_name":req.body.last_name,"street_address":req.body.street_address,"street_address_line":req.body.street_address_line,"city":req.body.city,
        "state":req.body.state,
        "zip_code":req.body.zip_code,
        "number":req.body.number,
        "email":req.body.email,
        "aadhaar":req.body.aadhaar}});
    const {acknowledged} = z;
    if(acknowledged){
        res.json({"msg":"updated success!"});
    }
    else{
        res.json({"msg":"not updated successfully!"});
    }
})

//delete request

app.delete("/delete",async (req,res)=>{
    await client.connect();
    const q = client.db("mern_db").collection("customers").deleteOne({"first_name":req.body.first_name});
})





app.listen(8080,()=>{
    console.log("server lisiting the port Node.8080");
})
