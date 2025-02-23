const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import CORS
const emailRoutes = require('./routes/emailRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({origin: "*"})); 
app.use(bodyParser.json());

// Routes
app.use('/api/email', emailRoutes);

app.get('/', (req, res)=>{
    res.send({code: 200, message: "Server is running"})
})

const server = ()=>{
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
}

module.exports=server