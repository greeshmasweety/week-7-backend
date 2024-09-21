const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();
const connection = require('./src/config/DBconnection.cjs');
const admin = require('./src/routes/adminRoutes.cjs');

// Enable CORS for all routes
app.use(cors()); 

// If you want to restrict CORS to a specific origin, use this instead:
// app.use(cors({ origin: 'http://localhost:3001' })); // Replace with your frontend URL

connection();  // Database Connection

app.use(express.json());

app.get('/', (req, res) => {
    console.log("HOME");
    res.send("Hello world !");  // Home route
});

app.use('/auth', admin);  // Admin login

console.log(process.env.DBCONNECT);

app.listen(3000, () => {
    console.log("Server is running...");
});
