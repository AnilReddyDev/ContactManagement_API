const express = require('express');
const connectDb = require("./config/dbConnection")
const errorHandler = require('./middleware/errorhandler')
const dotenv = require("dotenv").config();


connectDb();
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use("/api/contacts", require("./Routes/contactRoutes"));
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});
