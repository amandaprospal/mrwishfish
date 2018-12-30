require('dotenv').config();
const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();

app.use(compression());

app.use('/static', express.static(process.env.ABSOLUTE_STATIC_PATH));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.env.ABSOLUTE_STATIC_PATH, '../index.html'));
});

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) { console.log(err); }
  console.info(`Wishlist client started successfully on port ${PORT}`);
});