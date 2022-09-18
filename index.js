const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wsab1sp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run (){
  try{
    await client.connect();
    const foodCollection = client.db('food').collection('foods');
    const rowCollection = client.db('food').collection('row');
    const bifeRowCollection = client.db('food').collection('BifeRow');
    const fishCollection = client.db('food').collection('fishRow');
    const fishFoodCollection = client.db('food').collection('fishfood');
    const bifeFoodCollection = client.db('food').collection('BifeFood');
    const sideFoodCollection = client.db('insideFood').collection('rowOne');
    const sideFoodTwoCollection = client.db('insideFood').collection('rowTwo');

    app.get('/food', async (req,res) =>{
      const query ={};
      const cursor = foodCollection.find(query);
      const foods = await cursor.toArray();
      res.send(foods)
    });

    app.get('/row' , async (req,res) =>{
      const query = {};
      const cursor = rowCollection.find(query);
      const rows = await cursor.toArray();
      res.send(rows);
    });

    app.get('/biferow' , async (req,res) =>{
      const query = {};
      const cursor = bifeRowCollection.find(query);
      const rows = await cursor.toArray();
      res.send(rows);
    });

    app.get('/fishrow' , async (req,res) =>{
      const query = {};
      const cursor = fishCollection.find(query);
      const rows = await cursor.toArray();
      res.send(rows);
    });
    app.get('/fishfood' , async (req,res) =>{
      const query = {};
      const cursor = fishFoodCollection.find(query);
      const rows = await cursor.toArray();
      res.send(rows);
    });
    app.get('/bifefood' , async (req,res) =>{
      const query = {};
      const cursor = bifeFoodCollection.find(query);
      const rows = await cursor.toArray();
      res.send(rows);
    });

    app.get('/rowfood' , async (req,res) =>{
      const query = {};
      const cursor = sideFoodCollection.find(query);
      const rows = await cursor.toArray();
      res.send(rows);
    });
    app.get('/rowfoodtwo' , async (req,res) =>{
      const query = {};
      const cursor = sideFoodTwoCollection.find(query);
      const rows = await cursor.toArray();
      res.send(rows);
    });
  }
  finally{

  }
}
run().catch(console.dir)

app.get('/', (req,res) =>{
  res.send('project3 server is Running');
});
app.listen(port,()=>{
  console.log('listening to port', port);
})