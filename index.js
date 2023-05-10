const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;

const url = '';

const app = express();
app.use(cors());

app.use(bodyParser.json());

const port =3001;

app.post('/', async (req, res) => {
    const data = req.body;
  
      const client = new  MongoClient(url, {useNewUrlParser:true});
      client.connect();
      const db = client.db(dbName);
      const collection = db.collection('registrations');
  
      await collection.insertOne(data);
      console.log("inserted successfully")
  
      client.close();
      res.status(200).send('OK');
  })

  app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
  })