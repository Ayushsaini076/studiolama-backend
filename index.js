const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName='childcare';

const dataSchema = new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true}
})

const Data = mongoose.model('Data',dataSchema);



const app = express();
app.use(cors());

app.use(bodyParser.json());

const port =3001;

app.get('/',async (req,res)=>{
    try{
        const data = await Data.find();
        res.json(data);
    }
    catch(err){
        res.status(500).send(err);
    }
    
})

app.post('/', async (req, res) => {
    const data = req.body;
  
      const client = new  MongoClient(url, {useNewUrlParser:true});
      client.connect();
      const db = client.db(dbName);
      const collection = db.collection('child-data');
  
      await collection.insertOne(data);
      console.log("inserted successfully")
  
      client.close();
      res.status(200).send('OK');
  })

  app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
  })