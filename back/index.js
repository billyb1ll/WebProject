// filepath: /Users/bill/Documents/ICT/WebProject/back/index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());


// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});