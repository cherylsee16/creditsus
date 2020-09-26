const express = require('express');

// ------------ Create App ------------
const app = express();

// ------------ Parse requests of content-type: application/json ------------
app.use(express.json());

// ------------ Access Control Settings ------------
if (process.env.NODE_ENV === 'production') {
    var control_origins= ['https://nomads-sg.com'];
} else {
    var control_origins= ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'];
}
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow all websites 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // req headers 
    res.setHeader('Access-Control-Allow-Credentials', true); // sessions
    next();
});

// ------------ Routes ------------ 

app.get('/', function (req, res) {
    res.send('Server started')
})

// Contact Tracing 
app.use('/contact_trace', require('./routes/contact_trace'));

// clean_floor
app.use('/clean_floor', require('./routes/clean_floor'));

// ------------ Port Config ------------
const port = 5000;

app.listen(port, console.log(`Server started on port ${port}.`));
