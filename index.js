const path = require('path');

const cors = require('cors');
const express = require('express');
const app = express();

const data = require('./public/data');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.json(data);
})

app.listen(7676, () => {
    console.log('Server started');
})