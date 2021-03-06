const express = require('express');
const cors = require('cors');
const path = require('path');

//Cart and Reccomened Items
const cart = require('./cart.json');
const products = require('./products.json');

//App
const app = express()

//app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));



app.get('/', (req, res)=>{
  res.json({cart})
})

app.get('/products', (req, res)=>{
  res.json({products})
})




// Use Public Foler
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "public")));


//Run Server
  const PORT = process.env.PORT || 5000

  app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
  })
