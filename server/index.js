const path = require('path');
const fs = require('fs');

const cors = require('cors');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const express = require('express');
const app = express();

const data = require('./public/data');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.json(data);
})

app.post('/download', (req, res) => {
    const data = req.body.ISP[0];
    const doc = new PDFDocument;

    res.setHeader('Content-Disposition', 'attachment; filename=ISPDetails.pdf');
    res.setHeader('Content-Type', 'application/pdf');

    doc.image(`./public${data.imageURL}`, 250, 20, { scale: 0.25 });
    doc.fillColor("black")
        .text(`Provider : ${data.name}`, 100, 100)
        .text(`Price : ${data.price}`, 100, 120)
        .text(`Speed : ${data.speed}`, 100, 140)
        .text(`Contact No.: ${data.phone}`, 100, 160)
        .text(`Email : ${data.email}`, 100, 180)
        .text(`Details : ${data.desc}`, 100, 200)
    doc.pipe(res);
    doc.end();

})

app.listen(7676, () => {
    console.log('Server started');
})